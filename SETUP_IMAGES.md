# Instrucciones para mover las imágenes

Este archivo explica cómo organizar las imágenes existentes para el proyecto Next.js.

## Estructura requerida

```
public/
└── images/
    ├── logo.png                    ← Copiar de images/logo.png
    ├── favicon.png                 ← Copiar de images/favicon.png
    ├── error-medico-1408x704.jpg   ← Copiar de images/error-medico-1408x704.jpg
    ├── og-default.jpg              ← Crear o usar error-medico como base
    │
    ├── abogados_negligencias_medicas_negligencia_hospital.jpg
    ├── abogados_negligencias_medicas_negligencia_2.jpg
    ├── abogados_negligencias_medicas_negligencia_3.jpg
    │
    └── team/
        ├── garcia_valcarcel_caceres_abogados_negligencias_medicas_pedro_alfonso_garcia_valcarcel_vf.png
        ├── garcia_valcarcel_caceres_abogados_negligencias_medicas_miguel_caceres_sanchez_vf.png
        ├── garcia_valcarcel_caceres_abogados_negligencias_medicas_raquel_garcia_valcarcel_vf.png
        ├── garcia_valcarcel_caceres_abogados_negligencias_medicas_olga_martinez_martinez_vf.png
        └── garcia_valcarcel_caceres_abogados_negligencias_medicas_carmen_martinez_ramon_vf.png
```

## Pasos para Windows (PowerShell)

```powershell
cd C:\Users\NARCISOPARDOBUENDA\Desktop\GVCEXPERTOS

# Crear carpeta public/images si no existe
New-Item -ItemType Directory -Force -Path "public\images\team"

# Copiar imágenes principales
Copy-Item "images\logo.png" -Destination "public\images\"
Copy-Item "images\favicon.png" -Destination "public\images\"
Copy-Item "images\error-medico-1408x704.jpg" -Destination "public\images\"
Copy-Item "images\abogados_negligencias_medicas_negligencia_hospital.jpg" -Destination "public\images\"
Copy-Item "images\abogados_negligencias_medicas_negligencia_2.jpg" -Destination "public\images\"
Copy-Item "images\abogados_negligencias_medicas_negligencia_3.jpg" -Destination "public\images\"

# Copiar imágenes del equipo
Copy-Item "images\equipo\*" -Destination "public\images\team\"
```

## Verificar estructura

Después de copiar, deberías tener:

- public/images/logo.png
- public/images/favicon.png  
- public/images/error-medico-1408x704.jpg
- public/images/team/*.png (5 imágenes)
- public/images/*.jpg (3 imágenes de negligencias)
