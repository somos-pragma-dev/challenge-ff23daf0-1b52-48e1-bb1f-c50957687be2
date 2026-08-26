# Prompt para Mejorar el Codigo Base

Copia y pega el siguiente contenido completo en un asistente de IA (Claude, ChatGPT, etc.)
para obtener un ZIP con el proyecto corregido y listo para compilar.

---

```
Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación o descripciones sin código, genera los archivos
correspondientes sin aplicar análisis de compilación
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:
src/components/ProductList.tsx
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/product';

const ProductList: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {products.map((product: Product) => (
        <li key={product.id}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;


src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';

const useProducts = (): {
  products: Product[],
  loading: boolean,
  error: Error | null,
  addProduct: (product: Product) => Promise<void>,
  updateProduct: (product: Product) => Promise<void>,
  deleteProduct: (id: string) => Promise<void>
} => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProducts()
     .then(setProducts)
     .catch(setError)
     .finally(() => setLoading(false));
  }, []);

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
};

export default useProducts;


src/context/ProductContext.tsx
import React, { createContext, useContext } from 'react';
import useProducts from '../hooks/useProducts';

const ProductContext = createContext(null);

export const ProductProvider: React.FC = ({ children }) => {
  const products = useProducts();
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);


src/services/productService.ts
import { Product } from '../types/product';
import { validateProduct } from '../utils/validations';

const products: Product[] = [];

export const fetchProducts = async (): Promise<Product[]> => {
  return products;
};

export const addProduct = async (product: Product): Promise<void> => {
  if (!validateProduct(product)) throw new Error('Invalid product');
  products.push(product);
};

export const updateProduct = async (product: Product): Promise<void> => {
  if (!validateProduct(product)) throw new Error('Invalid product');
  const index = products.findIndex(p => p.id === product.id);
  if (index!== -1) products[index] = product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const index = products.findIndex(p => p.id === id);
  if (index!== -1) products.splice(index, 1);
};


src/pages/HomePage.tsx
import React from 'react';
import ProductList from '../components/ProductList';
import { ProductProvider } from '../context/ProductContext';

const HomePage: React.FC = () => {
  return (
    <ProductProvider>
      <ProductList />
    </ProductProvider>
  );
};

export default HomePage;


src/types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}


src/utils/validations.ts
import { Product } from '../types/product';

export const validateProduct = (product: Product): boolean => {
  if (product.name.trim() === '' || product.price <= 0) return false;
  return true;
};


src/assets/styles.css
/* Add your global styles here */


src/tests/ProductList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../components/ProductList';
import { ProductProvider } from '../context/ProductContext';

describe('ProductList', () => {
  test('renders loading state', () => {
    render(
      <ProductProvider>
        <ProductList />
      </ProductProvider>
    );
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});


package.json
{
  "name": "product-management-spa",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "typescript": "5.1.6",
    "react-scripts": "5.0.1",
    "@types/react": "18.2.0",
    "@types/react-dom": "18.2.0",
    "jest": "29.5.0"
  }
}


public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Management SPA</title>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>
</html>
```
