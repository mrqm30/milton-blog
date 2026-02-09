---
title: "Programación Orientada a Objetos en Python (OOP)"
summary: "Conceptos clave de POO en Python."
tags: ["Python", "POO", "Encapsulamiento", "Abstracción", "Herencia", "Polimorfismo"]
draft: false
---

# 🧠 Introducción

La **Programación Orientada a Objetos (POO)** es uno de los paradigmas más importantes en el desarrollo de software moderno.  
En Python, POO no solo permite escribir código funcional, sino **diseñar sistemas claros, extensibles y mantenibles**.

Este proyecto tiene como objetivo:
- Explicar POO **desde cero**
- Usar ejemplos claros en Python
- Mostrar diagramas y analogías visuales
- Construir una base sólida para Data Science e Ingeniería de Datos

---

# 🧱 ¿Qué es la Programación Orientada a Objetos?

La Programación Orientada a Objetos es una forma de programar donde el software se construye a partir de **objetos**, los cuales representan entidades del mundo real o del dominio del problema.

Un objeto combina:
- **Datos** (estado)
- **Comportamientos** (acciones)

En lugar de pensar solo en funciones, se piensa en **entidades que colaboran entre sí**.

---

# 🧩 Clases y Objetos

Una **clase** es un molde o plantilla.  
Un **objeto** es una instancia creada a partir de esa plantilla.


## Ejemplo en Python

```python
class Persona:
    def __init__(self, nombre):
        self.nombre = nombre

    def saludar(self):
        return f"Hola, soy {self.nombre}"
