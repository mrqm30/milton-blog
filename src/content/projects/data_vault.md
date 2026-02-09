---
title: "Data Wherehouse"
summary: "Metodología Data Vault 2.0"
heroImage: "/images/data_vault.png"
pubDate: 2026-02-08
tags: ["Data Architect", "Data Vault", "Hub", "Link", "Sátelite"]
draf: false
---

# 🏗️ Data Vault 2.0: De Raw Vault a Business Vault

> **Guía práctica, visual y mental para dominar Data Vault 2.0**
> Desde los fundamentos hasta el nivel **arquitecto de datos**, con foco en **Raw Vault → Business Vault**, reglas de negocio, satélites derivados y PIT tables.

---

## 🧠 1. ¿Qué es Data Vault 2.0 (la idea correcta)?

Data Vault 2.0 **no es solo un modelo de datos**. Es una **arquitectura de modelado** diseñada para sistemas que:

* 🔁 Cambian constantemente
* 🕒 Necesitan historia completa
* 🧾 Requieren auditoría y trazabilidad
* 📈 Deben escalar en Big Data / Cloud
* 🤖 Buscan automatización (ELT, CI/CD)

> 💡 **Regla mental:** Data Vault es el *sistema nervioso* del Data Warehouse.

---

## 🧩 2. Principios fundamentales de Data Vault 2.0

### 2.1 🔹 Separación de responsabilidades

| Pregunta clave             | Componente    |
| -------------------------- | ------------- |
| ¿Qué es?                   | **Hub**       |
| ¿Cómo se relaciona?        | **Link**      |
| ¿Cómo cambia en el tiempo? | **Satellite** |

📌 Nunca se mezclan responsabilidades.
👉 Es preferible **muchas tablas simples** que **pocas tablas complejas**.

---

### 2.2 🔹 Inmutabilidad

* ❌ No se actualiza historia
* ❌ No se borran registros
* ✅ Cada cambio genera **una nueva fila**

Esto permite:

* Auditoría
* Replay histórico
* Análisis temporal
* Machine Learning confiable

---

### 2.3 🔹 Business Key vs Hash Key

* **Business Key**: identidad real del negocio
* **Hash Key**: clave técnica, determinística, usada para joins

> 🧠 Los hashes son **contratos técnicos**, no lógica de negocio.

---

### 2.4 🔹 Diseño para automatización

Data Vault 2.0 está pensado para convivir con:

* PySpark
* dbt
* Airflow
* CI/CD
* Generación automática de código

👉 Un buen DV2 sigue **patrones repetibles y predecibles**.

---

## 🧱 3. Componentes principales

### 3.1 🔵 Hub — Identidad pura

Representa una **entidad de negocio estable**.

Contiene únicamente:

* Hash Key
* Business Key
* Metadata (`ldts`, `rsrc`)

🚫 Nunca contiene atributos descriptivos.

---

### 3.2 🟢 Link — Relaciones

Representa una **relación entre Hubs**.

Ejemplos:

* Cliente ↔ Cuenta
* Cliente ↔ Campaña
* Campaña ↔ Pieza ↔ Canal

📌 Las relaciones también pueden historizarse mediante satélites.

---

### 3.3 🟡 Satellite — Historia viva

Guarda:

* Atributos
* Cambios
* Contexto

Tipos comunes:

* Descriptivo
* Estado
* Multi-activo
* Effectivity
* Referencia

> 🧠 **Regla experta:** un satélite = un motivo de cambio.

---

## 🟦 4. Raw Vault

### 4.1 ¿Qué es Raw Vault?

Raw Vault captura la **verdad cruda** del sistema fuente.

Responde a una sola pregunta:

> ❓ *¿Qué dijo el sistema y cuándo lo dijo?*

Características:

* Sin reglas de negocio
* Sin correcciones
* 100% auditable
* Historia completa

> 🔍 Raw Vault es **forense**, no analítico.

---

## 🟨 5. Business Vault

### 5.1 ¿Qué es Business Vault?

Business Vault = Raw Vault + **inteligencia de negocio**.

Aquí:

* ✅ Se aplican reglas
* ✅ Se derivan atributos
* ✅ Se interpreta el dato

Arquitectura correcta:

```
Fuentes → Raw Vault → Business Vault → Data Marts
```

🚫 Raw Vault **nunca** depende de Business Vault.

---

### 5.2 ¿Qué va en Business Vault?

| Elemento                | ¿Va en BV? |
| ----------------------- | ---------- |
| Reglas de negocio       | ✅          |
| Campos calculados       | ✅          |
| Estandarización         | ✅          |
| Vigencias / Effectivity | ✅          |
| KPIs finales            | ❌          |
| Agregaciones            | ❌          |

📌 Business Vault **interpreta**, pero no agrega.

---

## 🧠 6. Satélites derivados (Business Vault)

### Idea clave

* Raw Vault **no se modifica**
* Business Vault **deriva y documenta**

Ejemplo:

```text
S_BV_CLIENTE_CONTACTO_BEST
- hk_cliente
- best_email
- rule_id
- ldts
```

> 🧠 Business Vault documenta el **por qué**, no solo el resultado.

---

## 📜 7. Reglas de negocio (Rule-Driven Pattern)

Buenas prácticas:

* Versionar reglas (`rule_id`)
* Documentarlas (`rule_desc`)
* Permitir cambios sin tocar Raw

Las reglas viven en el ETL, pero quedan **modeladas y auditables**.

---

## ⏱️ 8. Effectivity Satellites

Se usan cuando una relación o estado:

* Solo es válido en un rango temporal

Ejemplo:

```text
S_L_CLIENTE_CUENTA_EFF
- fecha_inicio
- fecha_fin
```

Clave para:

* Análisis histórico correcto
* Cumplimiento
* ML temporal

---

## 📍 9. PIT Tables (Point-In-Time)

### 9.1 ¿Qué es un PIT?

Un PIT es una **tabla de punteros** que responde:

> ❓ *¿Cuál era el último estado válido a una fecha específica?*

No duplica atributos, solo referencia estados.

Ejemplo:

```text
PIT_CLIENTE_DAILY
- hk_cliente
- as_of_date
- ldts_contacto_best
- ldts_estado
```

---

### 9.2 ¿Para qué sirven?

* ⚡ Performance
* 📸 Snapshots
* 📊 Data Marts
* 🤖 Feature Engineering

👉 **PIT ≠ Satélite**

---

## ⭐ 10. Relación con Data Marts

* Data Vault **no es la capa final**
* Los Data Marts se construyen **desde Business Vault**

```text
Raw Vault → Business Vault → Information Mart
```

---

## 🧠 11. Mentalidad de arquitecto Data Vault

Un junior pregunta:

> 🤔 ¿Dónde pongo este campo?

Un experto pregunta:

* ¿Cambia con el tiempo?
* ¿Depende de reglas humanas?
* ¿Debe auditarse?
* ¿Puede cambiar en el futuro?

Si respondes **sí**, probablemente va en **Business Vault**.

---

## 🧠 12. Regla final (memorízala)

> **Raw Vault captura hechos**
> **Business Vault captura decisiones**
> **Data Marts capturan respuestas**

---

## 🏁 13. Conclusión

Data Vault 2.0 no se trata de tablas, sino de **pensar en el tiempo, el cambio y la trazabilidad**.

Dominar Raw Vault y Business Vault te permite:

* Escalar sin rediseñar
* Cambiar reglas sin romper historia
* Construir analytics y ML confiables

👉 Este enfoque es el que diferencia a un **modelador** de un **arquitecto de datos**.

---

✍️ *Post pensado para arquitectos, ingenieros de datos y científicos de datos que trabajan en entornos reales de alta complejidad.*


