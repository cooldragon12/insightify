from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.contrib import messages
from .models import UserAccount, UserFeedback
from django.contrib.auth import authenticate, login, logout
from .forms import SignUpForm
from rest_framework.viewsets import ModelViewSet
from .serializeres import UserFeedBackSerializer

# Create your views here.
  


def loginsignup(request):
 if request.user.is_authenticated:
    return redirect('dashboard')
 
 signup_form = SignUpForm()

 if request.method == 'POST':
        signup_form = SignUpForm(request.POST)

        if 'login_submit' in request.POST:
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('dashboard')
            else:
               messages.error(request, 'username/password does not exist!') 
        else:
         if signup_form.is_valid():
            email = signup_form.cleaned_data.get('email')
            try:
               UserAccount.objects.get(email=email)
            except UserAccount.DoesNotExist:
               signup_form.save()
               return JsonResponse({'success': True})
            return JsonResponse({'sucess:' : False, 'reason' : 'email_error', 'error' : 'A user with that email already exists.'})
         else:
            return JsonResponse({'sucess:' : False, 'error' : signup_form.errors})


 context = {
        'signup_form': signup_form,
    }
 return render(request, "user_management/login_signup.html", context)

class UserFeedBackViewSet(ModelViewSet):
   queryset = UserFeedback.objects.all()
   serializer_class = UserFeedBackSerializer