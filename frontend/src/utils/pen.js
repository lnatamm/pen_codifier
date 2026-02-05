/**
 * Pen Codifier - Versão JavaScript Standalone
 * Implementação da lógica de codificação/decodificação sem necessidade de backend
 */

export class Pen {
  constructor(height = 1) {
    this.height = height;
    this.cipher = {
      'a': '01', 'b': '02', 'c': '03', 'd': '04', 'e': '05',
      'f': '06', 'g': '07', 'h': '08', 'i': '09', 'j': '10',
      'k': '11', 'l': '12', 'm': '13', 'n': '14', 'o': '15',
      'p': '16', 'q': '17', 'r': '18', 's': '19', 't': '20',
      'u': '21', 'v': '22', 'w': '23', 'x': '24', 'y': '25',
      'z': '26', ' ': '00',
    };
  }

  /**
   * Normaliza string removendo acentos e convertendo para minúsculas
   */
  _normalizeString(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  /**
   * Calcula a altura correspondente para uma palavra/frase
   */
  calculateRespectiveHeight(word) {
    const normalized = this._normalizeString(word);
    let stringRepresentation = '0.';
    
    for (const char of normalized) {
      stringRepresentation += this.cipher[char] || '';
    }
    
    return stringRepresentation;
  }

  /**
   * Decodifica uma fração/altura de volta para texto
   */
  decodifyHeight(height) {
    let heightStr = typeof height === 'number' ? height.toString() : height;
    
    // Remove o '0.' do início
    heightStr = heightStr.replace(/^0\./, '');
    
    // Remove qualquer caractere não numérico após a parte decimal
    heightStr = heightStr.replace(/[^0-9]/g, '');
    
    // Cria cipher reverso
    const reverseCipher = Object.fromEntries(
      Object.entries(this.cipher).map(([k, v]) => [v, k])
    );
    
    let decodedString = '';
    for (let i = 0; i < heightStr.length; i += 2) {
      const code = heightStr.substring(i, i + 2);
      if (code.length === 2 && reverseCipher[code]) {
        decodedString += reverseCipher[code];
      }
    }
    
    return decodedString;
  }

  /**
   * Codifica texto e retorna objeto com todos os dados
   */
  codify(text) {
    const fraction = this.calculateRespectiveHeight(text);
    const heightCm = parseFloat(fraction) * this.height;
    
    return {
      text,
      fraction,
      height_cm: heightCm
    };
  }

  /**
   * Decodifica fração e retorna objeto com todos os dados
   */
  decodify(fraction) {
    const text = this.decodifyHeight(fraction);
    
    return {
      fraction,
      text
    };
  }
}

// Instância global
export const pen = new Pen(1);
