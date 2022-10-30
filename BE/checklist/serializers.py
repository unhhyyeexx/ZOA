from rest_framework import serializers
from checklist.models import Checklist


class  ChecklistSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('id', 'text', 'status', 'created_at', 'to_users_id')


class ChecklistCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('text', 'to_users_id')


class  ChecklistDetailSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= '__all__'


class  ChecklistStateChangeSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Checklist
        fields= ('status',)