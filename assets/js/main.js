const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


//modal-chu de
const modal = document.querySelector('.modal-js');
const itemModal = document.querySelector('.header__nav-item-js');
const closebtn = document.querySelector('.modal__header-close');

//ham hien modal
function showModal() {
    modal.classList.add('open');
}

//ham an modal
function hideModal() {
    modal.classList.remove('open');
}

itemModal.addEventListener('click', showModal);
closebtn.addEventListener('click', hideModal);



//setting
const setting = document.querySelector('.setting-js');
const itemSetting = document.querySelector('.header__nav-item--setting');
itemSetting.addEventListener('click', function() {
    if(setting.style.display === 'none') {
        setting.style.display = 'block';
    }else {
        setting.style.display = 'none';
    }
})
setting.addEventListener('click', function(event) {
    event.stopPropagation();
})



// handel scroll container 
const containerScroll = $('.container');
containerScroll.onmouseover = function() {
    containerScroll.classList.add('active');
}
containerScroll.onmouseout = function() {
    containerScroll.classList.remove('active')
}



// handel header backgroundColor scroll
const header = $('.header');
const containers = Array.from($$('.container'));
containers.forEach(container => {
    container.onscroll = function() {
        const scroll = container.scrollY || container.scrollTop;
        if(scroll > 5) {
            Object.assign(header.style, {
                backgroundColor: '#170f23',
            })
        }else {
            Object.assign(header.style, {
                backgroundColor: 'transparent',
            })
        }
    }
})




// handle slide show
let imgIndex = 2;
function slideShow() {
    const slides = $$('.chanel__section-slide-item');
    const slideFirst = $('.chanel__section-slide-item.first');
    const slideSecond = $('.chanel__section-slide-item.second');
    const slideThird = slides[imgIndex === slides.length - 1 ? 0 : imgIndex + 1];

    slideThird.classList.replace('third', 'second');
    slideSecond.classList.replace('second', 'first');
    slideFirst.classList.replace('first', 'third');
    imgIndex++;
    if(imgIndex >= slides.length) {
        imgIndex = 0;
    }
    setTimeout(slideShow, 2000);
}

slideShow();



// handle width sidebar tablet
const sidebar = $('.sidebar');
const iconRight = $('.sidebar__tablet-icon-right');
const iconLeft = $('.sidebar__tablet-icon-left');

iconRight.addEventListener('click', function() {
    sidebar.classList.add('width-sidebar');
    if(iconRight.style.display = 'block') {
        iconRight.style.display = 'none';
    }
    iconLeft.style.display = 'block';
})
 
iconLeft.addEventListener('click', function() {
    sidebar.classList.remove('width-sidebar');
    if(iconLeft.style.display = 'block') {
        iconLeft.style.display = 'none';
    }
    iconRight.style.display = 'block';
})



// Tab UI
const textItems = $$('.text__center-item');
const tabPanes = $$('.tab-pane');

const textActive = $('.text__center-item-link--active')

textItems.forEach((tab, index) => {
    const pane =  tabPanes[index];
    tab.onclick = function() {
        $('.text__center-item.active').classList.remove('active');
        $('.tab-pane.active').classList.remove('active');

        this.classList.add('active');
        pane.classList.add('active');
    }
})



//
function toast({
    title = '',
    message = '',
    type = 'error',
    duration = 3000,
}) {
    const main = $('#toast');
    if(main) {
        const toast = document.createElement('div');

        // auto move toast
        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast);
        }, duration + 1000)

        // remove toast when click close
        toast.onclick = function(e) {
            if(e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        }

        const icons = {
            success: 'fa-solid fa-circle-check',
            info: 'fa-solid fa-circle-check',
            warning: 'fa-solid fa-exclamation',
            error: 'fa-solid fa-circle-check',
        };

        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);// làm tròn 2 chữ số

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}

function showErrorToast() {
    toast({
        title: 'Xin lỗi',
        message: 'Tính năng hiện tại chưa được cập nhật, mong bạn thông cảm !',
        type: 'error',
        duration: 5000,
    })
}



