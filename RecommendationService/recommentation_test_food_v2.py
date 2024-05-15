import unittest
import requests

class TestRecFunction2(unittest.TestCase):
    def test_rec_function2_valid_combination(self):
        url = "https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v2"
        params = {
            'value1': 'pizza',
            'value2': 'fresca'
        }
        expected_response = {
            "Plato Principal": "Pizza",
            "Bebida": "Fresca",
            "Postre": "Tiramisu"
        }
        response = requests.get(url, params=params)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected_response)

    def test_rec_function2_invalid_combination(self):
        url = "https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v2"
        params = {
            'value1': 'pizza',
            'value2': 'arroz_con_pollo'
        }
        expected_response = 'No encontramos una recomendación de acuerdo a esas dos entradas'
        response = requests.get(url, params=params)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.text, expected_response)

    def test_rec_function2_invalid_first_value(self):
        url = "https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v2"
        params = {
            'value1': 'no_existente',
            'value2': 'fresca'
        }
        expected_response = 'No ofrecemos recomendaciones para esa solicitud'
        response = requests.get(url, params=params)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.text, expected_response)

    def test_rec_function2_invalid_second_value(self):
        url = "https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v2"
        params = {
            'value1': 'pizza',
            'value2': 'no_existente'
        }
        expected_response = 'No ofrecemos recomendaciones para esa solicitud'
        response = requests.get(url, params=params)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.text, expected_response)

    def test_rec_function2_invalid_both_values(self):
        url = "https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v2"
        params = {
            'value1': 'no_existente_1',
            'value2': 'no_existente_2'
        }
        expected_response = 'No ofrecemos recomendaciones para esa solicitud'
        response = requests.get(url, params=params)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.text, expected_response)

if __name__ == '__main__':
    unittest.main()
