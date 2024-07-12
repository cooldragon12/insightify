from typing import Any
from django.forms import ModelForm
from .models import UserAccount
from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


class SignUpForm(UserCreationForm):
    class Meta:
        model = UserAccount
        fields = ['username','password1','password2','email','date_of_birth']
        widgets = {
            "date_of_birth" : forms.DateInput(
                    attrs={
                        'class' : 'form-control',
                        'type' : 'date',
                        'placeholder' : 'MM/DD/YYYY',
                        'name' : 'dateofbirth', 
                    }
                ),
            
        }

    def __init__(self, *args: Any, **kwargs: Any):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({
            'type' : 'text',
            'name' : 'username',
            'placeholder' : 'Insert Username',
            'required' : '',
        })
        self.fields['email'].widget.attrs.update({
            'type' : 'text',
            'name' : 'register_email',
            'placeholder' : 'Insert Email',
            'required' : '',
            'class' : 'form-input',
        })
        self.fields['password1'].widget.attrs.update({
            'type' : 'password',
            'name' : 'password1',
            'id' : 'password1',
            'placeholder' : 'Insert Password',
            'required' : '',
            'class' : 'form-input',
        })
        self.fields['password2'].widget.attrs.update({
            'type' : 'password',
            'name' : 'password2',
            'id' : 'password2',
            'placeholder' : 'Confirm Password',
            'class' : 'form-input',
            'required' : '',
        })

