from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from datetime import date
from rest_framework.exceptions import ErrorDetail

class TestCaseSetUp(APITestCase)  :
    def authenticate(self) :
        global user
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"κΉμ‘°μ","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        response = self.client.post(reverse('families:family'),{"name":'family'})
        user = self.client.get(reverse('accounts:profile'))
        user = user.data['id']
    
    def create_scrum(self) :
        global scrum_id
        self.authenticate()
        response = self.client.post(reverse("scrums:scrum"),{'emoji':'π','today':'μΆκ΅¬ν¨','yesterday':'λκ΅¬ν¨'})
        scrum_id = response.data['id']
class ScrumyCreateTestCase(TestCaseSetUp) :

    def test_1_create_scrum(self):
        self.authenticate()
        response = self.client.post(reverse("scrums:scrum"),{'emoji':'π','today':'μΆκ΅¬ν¨','yesterday':'λκ΅¬ν¨'})
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(response.data['emoji'],'π')
        self.assertEqual(response.data['today'],'μΆκ΅¬ν¨')
        self.assertEqual(response.data['yesterday'],'λκ΅¬ν¨')

    def test_2_create_scrum_again(self):
        self.authenticate()
        self.client.post(reverse("scrums:scrum"),{'emoji':'π','today':'μΆκ΅¬ν¨','yesterday':'λκ΅¬ν¨'})
        response = self.client.post(reverse("scrums:scrum"),{'emoji':'π','today':'μΌκ΅¬ν¨','yesterday':'λ°°κ΅¬ν¨'})
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data,{'μ€ν¬λΌμ νλ£¨μ ν κ°λ§ μμ± κ°λ₯ν©λλ€.'})

    def test_3_create_scrum_not_family(self):
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"κΉμ‘°μ","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        response = self.client.post(reverse("scrums:scrum"),{'emoji':'π','today':'μΌκ΅¬ν¨','yesterday':'λ°°κ΅¬ν¨'})
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'],ErrorDetail(string='μ΄ μμμ μνν  κΆν(permission)μ΄ μμ΅λλ€.', code='permission_denied'))


class ScrumRetriveTestCase(TestCaseSetUp):

    def test_1_retrive_scrum_today(self):
        self.create_scrum()
        response = self.client.get(reverse("scrums:scrum"))
        self.assertEqual(response.status_code,status.HTTP_200_OK)
    def test_2_retrive_scrum_main(self) :
        self.create_scrum()
        response = self.client.get(reverse("scrums:main_scrum"))
        self.assertEqual(response.status_code,status.HTTP_200_OK)
    def test_4_create_or_read_scrum_not_family(self):
        self.client.post(reverse("accounts:signup"),{"phone":"01046509260","name":"κΉμ‘°μ","password":"Password123!","birth":"1999-11-11"})
        response=self.client.post(reverse('accounts:login'),{"phone":"01046509260","password":"Password123!"})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {response.data['token']['access']}")
        response = self.client.get(reverse("scrums:scrum"))
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

class ScrumReadTestCase(TestCaseSetUp) :

    def test_1_retrive_scrum_user(self):
        self.create_scrum()
        today = date.today()
        response = self.client.get(reverse("scrums:detail", kwargs={'id':user}), {"created_at" : today.strftime("%Y-%m-%d")})
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_2_retrive_not_find_scrum(self):
        self.create_scrum()
        today = date.today()
        response = self.client.get(reverse("scrums:detail", kwargs={'id':0}), {"created_at" : today.strftime("%Y-%m-%d")})
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)
    
    def test_3_update_scrum_(self):
        self.create_scrum()
        response = self.client.put(reverse("scrums:detail", kwargs={'id':scrum_id}),{'today':'νν'})
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test_4_delete_scrum(self):
        self.create_scrum()
        response = self.client.delete(reverse("scrums:detail", kwargs={'id':scrum_id}))
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)