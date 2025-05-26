// Clase para simular usando montecarlo
// El objetivo es estimar el valor de π
// El area del cuadrado es 1
// El area del circulo es π/4 porque el radio es 0.5 y el area de un circulo es πr²

const X_CIRCULO = 0.5; // Radio del circulo
const Y_CIRCULO = 0.5; // Radio del circulo
const RADIO_CIRCULO = 0.5; // Radio del circulo

// Con el metodo simular(n) comienza la simulacion
class SimuladorPiMonteCarlo {
  
  // Genero los numeros aleatorios. En este caso son pares (x, y) en el rango [0, 1]
  static generarEntradaAleatoria() {
    return [Math.random(), Math.random()];
  }

  // Adapto los numeros aleatorios al rango de entrada del modelo.
  // En este caso los puntos ya estan en [0,1]x[0,1]
  static adaptarInputs([x, y]) {
    return { x, y };
  }

  // Ejecuto el modelo. Verifico si el punto (x, y) cae dentro del circulo de radio 0.5 centrado en (0.5, 0.5).
  // El circulo esta definido por la ecuación (x - 0.5)² + (y - 0.5)² <= 0.5²
  // Retorno el punto y un booleano indicando si esta dentro del circulo.
  static correrModelo({ x, y }) {
    // Punto de referencia del circulo
    const dx = x - X_CIRCULO;
    const dy = y - Y_CIRCULO;

    // Calculo la distancia del punto al centro del circulo
    const distancia = Math.sqrt(dx * dx + dy * dy);
    
    // Verifico si la distancia es menor o igual a 0.5 (el radio del circulo)
    // Si eso pasa, el punto esta dentro del circulo
    // Si no, el punto esta fuera del circulo
    const estaDentro = distancia <= RADIO_CIRCULO;
    
    return { x, y, estaDentro };
  }

  // Aca basicamente simulo usando montecarlo, acumulo los puntos y cuanto cuantos estan dentro del circulo.
  static simular(n) {
    let puntos = [];
    let puntosDentro = 0;

    for (let i = 0; i < n; i++) {
      const entradasRandom = SimuladorPiMonteCarlo.generarEntradaAleatoria();
    
      const entradasAdaptadas = SimuladorPiMonteCarlo.adaptarInputs(entradasRandom);
    
      const resultadoModelo = SimuladorPiMonteCarlo.correrModelo(entradasAdaptadas);
    
      if (resultadoModelo.estaDentro) puntosDentro++;
    
      puntos.push(resultadoModelo);
    }
    
    return { puntos, puntosDentro };
  }
}

export default SimuladorPiMonteCarlo;