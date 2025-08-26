function initHeader() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    // Mobile menu open/close
    if(hamburgerBtn && closeMenuBtn && mobileMenuOverlay){
        hamburgerBtn.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeMenuBtn.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Mobile dropdown for "Our Sister Concern"
    const sisterConcernToggle = document.getElementById('sisterConcernToggle');
    const mobileSisterConcernMenu = document.getElementById('mobileSisterConcernMenu');

    if(sisterConcernToggle && mobileSisterConcernMenu){
        sisterConcernToggle.addEventListener('click', function(e){
            e.preventDefault();
            mobileSisterConcernMenu.classList.toggle('show');

            const icon = this.querySelector('i');
            if(mobileSisterConcernMenu.classList.contains('show')){
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    }
}
