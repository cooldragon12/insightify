let sidebar = document.querySelector('.sidebar'); 
function setActiveSideBar(){
    sidebar.classList.toggle('active');
}
function scrollTitleNext(toScroll){
    $(toScroll).trigger('next.owl');
}   
function scrollTitlePrev(toScroll){
    $(toScroll).trigger('prev.owl');
}
function redirectToPage(url) {
    window.location.href = url;
}

