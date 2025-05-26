import { useState } from 'react';
import './App.css';
import SimuladorPiMonteCarlo from './SimuladorPiMonteCarlo';


const SIZE = 400;
const ARROZ_POR_PAQUETE = 16801;
const ARROZ_POR_PUÑADO = Math.floor(ARROZ_POR_PAQUETE * 0.1); // 10% de cada paquete
const DECIMALES = 10; // Cantidad de decimales a mostrar

// Esto mas que nada es codigo de React
function App() {
  const [puntos, setPuntos] = useState([]);
  const [puntosDentro, setPuntosDentro] = useState(0);

  const [repetidor, setRepetidor] = useState(1);
  const [cargando, setCargando] = useState(false);

  const tirarArroz = (numeroPuntos = 1000) => {
    const { puntos, puntosDentro } = SimuladorPiMonteCarlo.simular(numeroPuntos);
    
    setPuntos(prev => [...prev, ...puntos]);
    
    setPuntosDentro(prev => prev + puntosDentro);
  };

  const puntosTotales = puntos.length;
  
  const estimacionPi = 4 * (puntosDentro / puntosTotales);

  const mostrarPi = puntosTotales > 0 ? estimacionPi : 0;

  const error = puntosTotales > 0 ? Math.abs(Math.PI - mostrarPi).toFixed(DECIMALES) : 0;

  const borrarPuntos = () => {
    setPuntos([]);

    setPuntosDentro(0);
  };

  const manejarLanzamiento = async () => {
    setCargando(true);

    for (let i = 0; i < repetidor; i++) {
      await new Promise(resolve => setTimeout(resolve, 0));
    
      tirarArroz(ARROZ_POR_PUÑADO);
    }

    setCargando(false);
  };

  return (
    <div className="App">
      <h1>Estimador de π con Monte Carlo</h1>
      
      <label>
        Cuantas paquetes de arroz voy a tirar?:&nbsp; 
        <input
          type="number"
          min="1"
          value={repetidor}
          onChange={e => setRepetidor(Math.max(1, Number(e.target.value)))}
          style={{ width: 60 }}
          disabled={cargando}
        />
      </label>
      (Con 100 ya tarda 30 segundos. Ojo con el numero para que no se cuelgue)
      <p>Segun internet, por paquete existen {ARROZ_POR_PAQUETE} granos de arroz aproximadamente.</p>
      <p>Asique para este experimento, vamos a lanzar puñados de un 10% de cada paquete. {ARROZ_POR_PUÑADO} granos de arroz x puñado</p>
      <p>Despues de cada lanzamiento, tocar el boton "Borrar puntos"</p>
      <div>
      <button onClick={manejarLanzamiento} disabled={cargando}>Tirar</button>
      
      <button onClick={borrarPuntos} disabled={cargando}>Borrar puntos</button>
      </div>
      
      
      {cargando && (
        <div style={{ margin: '10px', fontWeight: 'bold' }}>
          <span className="spinner" /> Cargando...
        </div>
      )}

      <p>Granos de arroz lanzados en total: {puntosTotales}</p>
      <p>Granos de arroz dentro del circulo: {puntosDentro}</p>
      <p>Estimacion de π: {mostrarPi.toFixed(DECIMALES)}</p>
      <p>Error: {error}</p>

      <svg width={SIZE} height={SIZE} style={{ border: '1px solid black' }}>
        {/* Circulo */}
        <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2} fill="none" stroke="blue" />

        {/* Puntos */}
        {puntos.map((p, idx) => (
          <circle
            key={idx}
            cx={p.x * SIZE}
            cy={p.y * SIZE}
            r={1.5}
            fill={p.estaDentro ? 'green' : 'red'}
          />
        ))}
      </svg>
      
      {/* Spinner CSS */}
      <style>
        {`
          .spinner {
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 3px solid #ccc;
            border-top: 3px solid #007bff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            vertical-align: middle;
            margin-right: 8px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}

export default App;
