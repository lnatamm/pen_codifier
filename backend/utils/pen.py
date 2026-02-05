import unicodedata

class Pen:

    def __init__(self, height: int, cipher: dict = None):
        self.height = height
        if cipher is None:
            self.cipher = {
                'a': '01', 'b': '02', 'c': '03', 'd': '04', 'e': '05',
                'f': '06', 'g': '07', 'h': '08', 'i': '09', 'j': '10',
                'k': '11', 'l': '12', 'm': '13', 'n': '14', 'o': '15',
                'p': '16', 'q': '17', 'r': '18', 's': '19', 't': '20',
                'u': '21', 'v': '22', 'w': '23', 'x': '24', 'y': '25',
                'z': '26', ' ': '00',
            }

    def _normalize_string(self, string: str) -> str:
        normalized = unicodedata.normalize('NFD', string)
        without_accents = ''.join(char for char in normalized if unicodedata.category(char) != 'Mn')
        return without_accents.lower()

    def calculate_respective_height(self, word: str) -> str:
        word = self._normalize_string(word)
        string_representation = '0.'
        for character in word:
            string_representation += self.cipher.get(character, '')

        return string_representation


    def decodify_height(self, height) -> str:
        # Aceita tanto string quanto float
        if isinstance(height, float):
            height_str = str(height)
        else:
            height_str = str(height)
        
        # Remove o '0.' do início
        height_str = height_str.replace('0.', '', 1)
        
        reverse_cipher = {v: k for k, v in self.cipher.items()}
        decoded_string = ''
        for i in range(0, len(height_str), 2):
            code = height_str[i:i+2]
            decoded_string += reverse_cipher.get(code, '')

        return decoded_string
