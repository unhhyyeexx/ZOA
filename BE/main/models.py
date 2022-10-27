from django.db import models
from accounts.models import User

class Checklist(models.Model) :
    id = models.BigAutoField(primary_key=True)
    Text = models.CharField(max_length=20,verbose_name='체크리스트 내용')
    status = models.BooleanField(default=False, verbose_name='완료 여부')
    photo = models.ImageField(upload_to='checklist/photo/',
                default='checklist/photo/photo_default1.png',
                null=True, blank=True, verbose_name='체크리스트 사진')
    created_at = models.DateField(auto_now_add=True)
    from_user_id = models.ForeignKey(User, related_name='fromUser', on_delete=models.CASCADE, db_column='from_user_id')
    to_user_id = models.ForeignKey(User, related_name='toUser', on_delete=models.CASCADE, db_column='to_user_id')

    def __str__(self) :
        return self.Text