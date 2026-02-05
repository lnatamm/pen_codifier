import React, { useState, useEffect } from 'react';
import './PenCodifier.css';
import { pen } from '../utils/pen';

const PenCodifier = () => {
  const [activeTab, setActiveTab] = useState('codify');
  
  // Altura da caneta é fixa em 1cm
  const penHeight = 1;
  
  // Estado para Codificar
  const [textToCodify, setTextToCodify] = useState('');
  const [codifyResult, setCodifyResult] = useState(null);
  
  // Estado para Decodificar
  const [sliderValue, setSliderValue] = useState(0.5); // Valor do slider para visualização
  const [fractionToDecodify, setFractionToDecodify] = useState('');
  const [measuredHeight, setMeasuredHeight] = useState('');
  const [decodifyResult, setDecodifyResult] = useState(null);
  
  const [error, setError] = useState('');

  // Auto-decodificar quando a fração muda (trabalhando com strings)
  useEffect(() => {
    if (activeTab === 'decodify' && fractionToDecodify && fractionToDecodify.trim() !== '') {
      try {
        const result = pen.decodify(fractionToDecodify);
        // Manter a fração como string para preservar precisão
        result.measured_height_cm = fractionToDecodify;
        setDecodifyResult(result);
        setError('');
      } catch (err) {
        setError('Erro ao decodificar: ' + err.message);
      }
    }
  }, [fractionToDecodify, activeTab]);

  // Sincronizar slider com fração (apenas para valores válidos do slider)
  useEffect(() => {
    if (activeTab === 'decodify' && sliderValue > 0) {
      const fraction = sliderValue.toString();
      setFractionToDecodify(fraction);
      setMeasuredHeight(fraction);
    }
  }, [sliderValue, activeTab]);

  // Auto-codificar quando o texto muda
  useEffect(() => {
    if (activeTab === 'codify' && textToCodify.trim() !== '') {
      try {
        const result = pen.codify(textToCodify);
        setCodifyResult(result);
        setError('');
      } catch (err) {
        setError('Erro ao codificar o texto: ' + err.message);
      }
    } else if (activeTab === 'codify' && textToCodify.trim() === '') {
      setCodifyResult(null);
    }
  }, [textToCodify, activeTab]);

  const handleCodify = () => {
    if (!textToCodify.trim()) {
      setError('Por favor, digite um texto para codificar');
      return;
    }
    
    setError('');
    
    try {
      const result = pen.codify(textToCodify);
      setCodifyResult(result);
    } catch (err) {
      setError('Erro ao codificar o texto: ' + err.message);
    }
  };

  const handleDecodify = () => {
    // Se o usuário digitou a altura medida, converter para fração
    if (measuredHeight && !fractionToDecodify) {
      const heightValue = parseFloat(measuredHeight);
      if (isNaN(heightValue) || heightValue <= 0) {
        setError('Por favor, digite uma altura válida');
        return;
      }
      
      // Converter altura para fração (altura / altura_caneta)
      const fraction = (heightValue / penHeight).toFixed(10);
      setFractionToDecodify(fraction);
      
      setError('');
      try {
        const result = pen.decodify(fraction);
        result.measured_height_cm = heightValue;
        setDecodifyResult(result);
      } catch (err) {
        setError('Erro ao decodificar: ' + err.message);
      }
      return;
    }
    
    if (!fractionToDecodify.trim()) {
      setError('Por favor, digite uma fração ou uma altura medida');
      return;
    }
    
    setError('');
    
    try {
      const result = pen.decodify(fractionToDecodify);
      // Se temos altura medida, incluir no resultado
      if (measuredHeight) {
        result.measured_height_cm = parseFloat(measuredHeight);
      }
      setDecodifyResult(result);
    } catch (err) {
      setError('Erro ao decodificar a fração: ' + err.message);
    }
  };

  const clearCodify = () => {
    setTextToCodify('');
    setCodifyResult(null);
    setError('');
  };

  const clearDecodify = () => {
    setSliderValue(0.5);
    setFractionToDecodify('');
    setMeasuredHeight('');
    setDecodifyResult(null);
    setError('');
  };

  return (
    <div className="pen-codifier">
      <div className="header">
        <h1>🖊️ Pen Codifier</h1>
        <p className="subtitle">Codifique frases em frações decimais usando uma caneta de 1cm</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'codify' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('codify');
            setError('');
          }}
        >
          📝 Codificar
        </button>
        <button 
          className={`tab ${activeTab === 'decodify' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('decodify');
            setError('');
          }}
        >
          🔓 Decodificar
        </button>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {activeTab === 'codify' && (
        <div className="tab-content">
          <div className="input-section">
            <label htmlFor="text-input">Digite uma frase:</label>
            <textarea
              id="text-input"
              value={textToCodify}
              onChange={(e) => setTextToCodify(e.target.value)}
              placeholder="Ex: mago"
              rows="3"
            />
            
            <div className="button-group">
              <button 
                className="btn btn-secondary" 
                onClick={clearCodify}
              >
                🗑️ Limpar
              </button>
            </div>
          </div>

          {codifyResult && (
            <div className="result-section">
              <h3>Resultado:</h3>
              <div className="result-card">
                <div className="result-item">
                  <span className="result-label">Fração:</span>
                  <span className="result-value fraction">{codifyResult.fraction}</span>
                </div>
                <div className="visual-representation">
                  <div className="pen-container">
                    <div className="pen-label">Caneta de Referência (1cm)</div>
                    <div className="pen">
                      <div className="pen-top"></div>
                      <div className="pen-clip"></div>
                      <div className="pen-tip"></div>
                      <div className="pen-height-badge">1cm</div>
                    </div>
                  </div>
                  <div className="height-visualization">
                    <div className="height-label">Altura Correspondente</div>
                    <div className="slider-wrapper static">
                      <div className="vertical-slider-static"></div>
                      <div 
                        className="slider-marker"
                        style={{ 
                          bottom: `${Math.min((codifyResult.height_cm / penHeight) * 100, 100)}%`
                        }}
                      >
                        <span className="marker-label">{codifyResult.height_cm}cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'decodify' && (
        <div className="tab-content">
          <div className="decodify-interactive">
            <div className="slider-section">
              <h3>🎯 Ajuste a altura na caneta:</h3>
              <p className="instruction">Use o slider para marcar a altura medida na caneta de 1cm</p>
              
              <div className="slider-container">
                <div className="pen-with-slider">
                  <div className="pen-container">
                    <div className="pen-label">Caneta de Referência (1cm)</div>
                    <div className="pen">
                      <div className="pen-top"></div>
                      <div className="pen-clip"></div>
                      <div className="pen-tip"></div>
                      <div className="pen-height-badge">1cm</div>
                    </div>
                  </div>
                  
                  <div className="slider-wrapper">
                    <input
                      type="range"
                      className="vertical-slider"
                      min="0.000001"
                      max="1"
                      step="0.000001"
                      value={sliderValue}
                      onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                      orient="vertical"
                    />
                    <div 
                      className="slider-marker"
                      style={{ bottom: `${sliderValue * 100}%` }}
                    >
                      <span className="marker-label">{sliderValue * penHeight}cm</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="fraction-input-section">
                <label htmlFor="fraction-manual-input">Digite a fração:</label>
                <input
                  id="fraction-manual-input"
                  type="text"
                  value={fractionToDecodify}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFractionToDecodify(value);
                    
                    // Atualizar o slider apenas se for um número válido entre 0 e 1
                    const fractionValue = parseFloat(value);
                    if (!isNaN(fractionValue) && fractionValue > 0 && fractionValue <= 1) {
                      setSliderValue(fractionValue);
                    }
                  }}
                  placeholder="Ex: 0.13010715 ou 0.130107152008091222..."
                />
                <small style={{ 
                  display: 'block', 
                  marginTop: '8px', 
                  color: '#546e7a',
                  fontSize: '0.9em'
                }}>
                  💡 Suporta frações de qualquer tamanho. O slider se ajusta apenas para valores entre 0 e 1.
                </small>
              </div>
            </div>
            
            <div className="button-group">
              <button 
                className="btn btn-secondary" 
                onClick={clearDecodify}
              >
                🔄 Resetar
              </button>
            </div>
          </div>

          {decodifyResult && (
            <div className="result-section">
              <h3>📖 Resultado:</h3>
              <div className="result-card">
                <div className="result-item highlight">
                  <span className="result-label">Texto decodificado:</span>
                  <span className="result-value text-decoded">
                    {decodifyResult.text || 'mensagem inválida'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="info-section">
        <h3>ℹ️ Como funciona?</h3>
        <p>
          Cada letra do alfabeto é codificada em um número de dois dígitos (a=01, b=02, ..., z=26, espaço=00).
          A fração decimal representa a "altura" proporcional a uma caneta de altura conhecida.
        </p>
        <p>
          <strong>Codificar:</strong> "mago" com caneta de 1cm → fração 0.13010715 → altura 0.13010715 cm
        </p>
        <p>
          <strong>Decodificar:</strong> Use o slider vertical para ajustar em tempo real a altura medida na caneta de 1cm. 
          A mensagem é decodificada automaticamente conforme você move o slider.
        </p>
      </div>
    </div>
  );
};

export default PenCodifier;
