import unittest
import requests

class TestRecFunction(unittest.TestCase):
    def test_rec_function_maindishes(self):
        url = "https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v1"
        params = {
            'type': 'maindishes',
            'value': 'pizza'
        }
        expected_response = {
            "Plato Principal": "Pizza",
            "Bebida": "Fresca",
            "Postre": "Tiramisu"
        }
        response = requests.get(url, params=params)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected_response)

    def test_rec_function_drinks(self):
        url = "https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v1"
        params = {
            'type': 'drinks',
            'value': 'coca_cola'
        }
        expected_response = {
            "Plato Principal": "Arroz con Pollo",
            "Bebida": "Coca_cola",
            "Postre": "Torta chilena"
        }
        response = requests.get(url, params=params)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected_response)

    def test_rec_function_desserts(self):
        url = "https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v1"
        params = {
            'type': 'desserts',
            'value': 'flan'
        }
        expected_response = {
            "Plato Principal": "Paella",
            "Bebida": "Sangria",
            "Postre": "Flan"
        }
        response = requests.get(url, params=params)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected_response)

    def test_rec_function_invalid_type(self):
        url = "https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v1"
        params = {
            'type': 'invalidtype',
            'value': 'arroz_con_pollo'
        }
        expected_response = 'Ese tipo de entrada no existe'
        response = requests.get(url, params=params)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.text, expected_response)

    def test_rec_function_invalid_value(self):
        url = "https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v1"
        params = {
            'type': 'maindishes',
            'value': 'invalidvalue'
        }
        expected_response = 'No ofrecemos recomendaciones para esa solicitud'
        response = requests.get(url, params=params)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.text, expected_response)

if __name__ == '__main__':
    unittest.main()
