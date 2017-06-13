$(function(){

    let MobileMenu = {
        DOMElements: {
            body: $("body"),
            menuButton: $(".menu_button"),
            menuList: $(".menu_list"),
            mobileLogo: $(".mobile_logo"),
        },
        State: {
            menuActive: false,
        },
        setSizeMenu: () =>{
            let list = MobileMenu.DOMElements.menuList;
            let mobileLogo = MobileMenu.DOMElements.mobileLogo;
            let windowWidth = $(window).width();
            let windowHeight = $(window).height();
            if (windowWidth >= windowHeight) {
                list.addClass("mobile_menu_horizontal");
                mobileLogo.addClass("mobile_logo_horizontal");
                mobileLogo.removeClass("mobile_logo_vertical");
                list.removeClass("mobile_menu_vertical");
            }
            else{
                list.addClass("mobile_menu_vertical");
                mobileLogo.addClass("mobile_logo_vertical");
                mobileLogo.removeClass("mobile_logo_horizontal");
                list.removeClass("mobile_menu_horizontal");
            }
        },
        setButton: () =>{
            MobileMenu.DOMElements.menuButton.on('click', (event) => {
                event.preventDefault();
                let list = MobileMenu.DOMElements.menuList;
                let button = MobileMenu.DOMElements.menuButton;
                let body = MobileMenu.DOMElements.body;
                let menuActive = MobileMenu.State.menuActive;
                MobileMenu.setSizeMenu();
                body.toggleClass("stop_scroll");
                button.toggleClass("menu_active_button");
                if(menuActive == false){
                    MobileMenu.State.menuActive = true;
                }
                else{
                    MobileMenu.State.menuActive = false;
                }
                list.toggle(300);
            });
        },
        setResize: () =>{
            let windowWidth = $(window).width();
            let list = MobileMenu.DOMElements.menuList;
            let button = MobileMenu.DOMElements.menuButton;
            let body = MobileMenu.DOMElements.body;
            let mobileLogo = MobileMenu.DOMElements.mobileLogo;
            if(windowWidth < 1024){
                MobileMenu.setSizeMenu();
                if(MobileMenu.State.menuActive == false){
                    list.css("display", "none");
                }
                else{
                    list.css("display", "block");
                }
            }
            else{
                let list = MobileMenu.DOMElements.menuList;
                list.removeClass("mobile_menu_vertical", "mobile_menu_horizontal").css("display", "block");
                mobileLogo.removeClass("mobile_logo_vertical mobile_logo_horizontal");
            }
        },
    };
    let ServiceMenu = {
        DOMElements: {
            serviceList: 0,
            buttons: 0,
            serviceDescription: 0,
        },
        setElements: () =>{
            let checkServiceList = $(".service_list").length;
            if (checkServiceList > 0){
                let serviceList = $(".service_list");
                let buttons = serviceList.find("a");
                let serviceDescription = buttons.next();
                ServiceMenu.DOMElements.serviceDescription = serviceDescription;
                ServiceMenu.DOMElements.serviceList = serviceList;
                ServiceMenu.DOMElements.buttons = buttons;
                return true;
            }
            else{
                return false;
            }
        },
        setButtons: () =>{
            if(ServiceMenu.setElements()){
                let buttons = ServiceMenu.DOMElements.buttons;
                buttons.on('click', (event) => {
                    event.preventDefault();
                    let windowWidth = $(window).width();
                    if(windowWidth < 1200){
                        let eventTarget = $(event.target);
                        let eventParent = eventTarget.parent();
                        let checkParent = eventParent.hasClass("service_name");
                        if(checkParent){
                            let serviceList = eventTarget.next();
                            eventParent.toggleClass("active_service_name");
                            serviceList.toggleClass("service_description_active");
                            serviceList.toggle(300);
                        }
                        else{
                            let serviceList = eventParent.next();
                            eventParent.parent().toggleClass("active_service_name");
                            serviceList.toggleClass("service_description_active");
                            serviceList.toggle(300);
                        }
                    }
                })
            }
        },
        setResize: () =>{
            let windowWidth = $(window).width();
            if (ServiceMenu.setElements()){
                if(windowWidth > 1199){
                    ServiceMenu.DOMElements.serviceDescription.css("display", "block");
                }
                else{
                    let serviceDescription = ServiceMenu.DOMElements.serviceDescription;
                    serviceDescription.each(function(){
                        if($(this).hasClass("service_description_active")){
                            $(this).css("display", "block");
                        }
                        else{
                            $(this).css("display", "none");
                        }
                    })
                }
            }
        },
    };
    let CategoryMenu = {
        DOMElements:{
            categoryList: 0,
            buttons: 0,
        },
        State:{
            menuActive: false,
            activeCategory: null,
        },
        setElements: () => {
            let checkCategoryList = $(".category_list").length;
            if (checkCategoryList > 0){
                let categoryList = $(".category_list");
                let categoryActive = $(".category_list").find(".category_active").children()[0];
                let dataCategory = $(categoryActive).data("category");
                let buttons = categoryList.find("li");
                CategoryMenu.State.activeCategory = dataCategory;
                CategoryMenu.DOMElements.categoryList = categoryList;
                CategoryMenu.DOMElements.buttons = buttons;
                return true;
            }
            else{
                return false;
            }
        },
        setButtons: () => {
            if(CategoryMenu.setElements()){
                let buttons = CategoryMenu.DOMElements.buttons;
                buttons.on('click', (event) => {
                    event.preventDefault();
                    let windowWidth = $(window).width();
                    if(windowWidth < 680){
                        let eventParent = $(event.target).parent();
                        if(eventParent.hasClass("category_active") || eventParent.parent().hasClass("category_active")){
                            if(!(CategoryMenu.State.menuActive)){
                                buttons.each(function(){
                                    if( !( $(this).hasClass("category") || $(this).hasClass("category_active") )){
                                        $(this).addClass("category_menu_active");
                                        $(this).slideDown(600);
                                    }
                                    else if(buttons.hasClass("category_active")){
                                        $(this).addClass("category_name_active");
                                    }
                                });
                                CategoryMenu.State.menuActive = true;
                            }
                            else if(CategoryMenu.State.menuActive){
                                buttons.each(function(){
                                    if( !( $(this).hasClass("category") || $(this).hasClass("category_active") )){
                                        $(this).removeClass("category_menu_active");
                                        $(this).slideUp(600);
                                    }
                                    else if(buttons.hasClass("category_active")){
                                        $(this).removeClass("category_name_active");
                                    }
                                });
                                CategoryMenu.State.menuActive = false;
                            }
                        }
                        else if(eventParent.hasClass("category_menu_active")){
                            let oldCategory = $(".category_active");
                            oldCategory.removeClass("category_active category_name_active").addClass("category_menu_active").css("display", "block");
                            eventParent.removeClass("category_menu_active").addClass("category_active category_name_active");
                        }
                    }
                    else{
                        let eventParent = $(event.target).parent();
                        if(!(eventParent.hasClass("category_active") || eventParent.parent().hasClass("category_active"))){
                            let oldCategory = $(".category_active");
                            if($(event.target).attr("href") == "#"){
                                eventParent.addClass("category_active");
                            }
                            else{
                                $(event.target).addClass("category_active");
                            }
                            oldCategory.removeClass("category_active");
                        }
                    }
                    let slides = $(Gallery.State.allRealizations);
                    let eventTarget = $(event.target);
                    if(!(eventTarget.attr("href"))){
                        eventTarget = eventTarget.parent();
                    }
                    let category = eventTarget.data("category");
                    let slider = $(".realizations_slider");
                    let loadButton = $(".button_box").find(".button_black");
                    Gallery.State.filteredArr = [];
                    if(category != CategoryMenu.State.activeCategory){
                        slider.html("");
                        if(category != "all"){
                            slides.each(function(){
                                let self = $(this)[0];
                                let categoryList = $(self.services).prop(category);
                                if (categoryList.length > 0) {
                                    Gallery.State.filteredArr.push($(this)[0]);
                                }
                            })
                            Gallery.setGallery(Gallery.State.filteredArr);
                        }
                        else{
                            Gallery.setGallery(Gallery.State.allRealizations);
                        }
                        loadButton.removeClass("button_off");
                        Gallery.setElements();
                        Gallery.setActiveBox();
                        Gallery.setRealizationBox();
                        Gallery.setRealizationSlider();
                    }
                    let serviceContainer = $(".service_container");
                    if(serviceContainer.length > 0 && category != CategoryMenu.State.activeCategory){
                        let sectionServices = $(".section_services");
                        let newCategory = category;
                        let oldServices = $(".service_container_active");
                        let newServices;
                        let sectionTop = $(".section_top");
                        let serviceTop = sectionTop.find(".service_top");
                        let oldServiceTop = sectionTop.find(".service_top" + ".service_active");
                        let newServiceTop;
                        if(newCategory == "all"){
                            newCategory = "concierge"
                        }
                        serviceContainer.each(function(){
                            if($(this).data("category") == newCategory){
                                newServices = this;
                            }
                        });
                        serviceTop.each(function(){
                            if($(this).data("category") == newCategory){
                                newServiceTop = this;
                            }
                        })
                        oldServices.slideUp(400);
                        sectionServices.slideUp(400, function(){
                            oldServices.removeClass("service_container_active");
                            oldServices.css("display", "");
                            $(newServices).addClass("service_container_active");
                        });
                        sectionServices.slideDown(600);
                        $(newServiceTop).css("position", "absolute").css("top", 0).css("opacity", 0);
                        oldServiceTop.animate({
                            opacity: 0,
                        }, 300);
                        $(newServiceTop).animate({
                            opacity: 1,
                        },300,function(){
                            oldServiceTop.removeClass("service_active");
                            oldServiceTop.css("opacity", "");
                            $(newServiceTop).css("position", "").css("top", "").css("opacity", "");
                            $(newServiceTop).addClass("service_active");
                        });

                    }
                    CategoryMenu.State.activeCategory = category;
                });
            }
        },
        setServiceSelect: () =>{
            let serviceContainer = $(".service_container");
            if(serviceContainer.length > 0){
                let list = serviceContainer.find("ul");
                let services = list.find("li");
                services.on('click', (event) => {
                    event.preventDefault();
                    let eventTarget = $(event.target);
                    let serviceList = eventTarget.parent();
                    let data = eventTarget.data("service");
                    let descriptionBox =eventTarget.parent().parent().next();
                    let descriptions = descriptionBox.children();
                    let oldDescription = descriptionBox.find(".service_active");
                    let oldList =  serviceList.find(".list_active");
                    let oldData = oldList.data("service");
                    let newDescription;
                    descriptions.each(function(){
                        if($(this).data("service") == data){
                            newDescription = $(this);
                        }
                    })
                    if(data != oldData){
                        oldList.removeClass("list_active");
                        eventTarget.addClass("list_active");
                        newDescription.css("position", "absolute").css("top",0).css("opacity", 0);
                        oldDescription.animate({
                            opacity: 0,
                        }, 300);
                        newDescription.animate({
                            opacity: 1,
                        }, 300, function(){
                            newDescription.css("position", "").css("top", "").css("opacity", "");
                            newDescription.addClass("service_active");
                            oldDescription.css("opacity", "");
                            oldDescription.removeClass("service_active");
                        });
                    }
                })
            };
        },
        setResize: () => {
            if(CategoryMenu.State.menuActive){
                let windowWidth = $(window).width();
                let buttons = CategoryMenu.DOMElements.buttons;
                if(windowWidth >= 680){
                    buttons.each(function(){
                        if($(this).hasClass("category")){
                            $(this).css("display", "none");
                        }
                        else if($(this).hasClass("category_active")){
                            $(this).removeClass();
                            $(this).addClass("category_active");
                        }
                        else{
                            $(this).css("display", "block");
                        }
                    });
                }
                else{
                    buttons.each(function(){
                        if($(this).hasClass("category")){
                            $(this).css("display", "block");

                        }
                        else if($(this).hasClass("category_active")){
                            $(this).removeClass();
                            $(this).addClass("category_active");
                            if(CategoryMenu.State.menuActive == true){
                                $(this).addClass("category_name_active");
                            }
                        }
                        else{
                            if(CategoryMenu.State.menuActive == true){
                                $(this).addClass("category_menu_active");
                            }
                            else{
                                $(this).removeClass("category_menu_active");
                                $(this).css("display", "none");
                            }
                        }
                    });
                }
            }
            let windowWidth = $(window).width();
            let buttons = CategoryMenu.DOMElements.buttons;
            if(windowWidth >= 680 && buttons != 0){
                buttons.each(function(){
                    $(this).css("display", "block");
                    if($(this).hasClass("category")){
                        $(this).css("display", "none");
                    }
                });
            }
            else if(windowWidth < 680){
                buttons.each(function(){
                    if($(this).hasClass("category")){
                        $(this).css("display", "block");

                    }
                    else if($(this).hasClass("category_active")){
                        $(this).removeClass();
                        $(this).addClass("category_active");
                        if(CategoryMenu.State.menuActive == true){
                            $(this).addClass("category_name_active");
                        }
                    }
                    else{
                        if(CategoryMenu.State.menuActive == true){
                            $(this).addClass("category_menu_active");
                        }
                        else{
                            $(this).removeClass("category_menu_active");
                            $(this).css("display", "none");
                        }
                    }
                });
            }
        },
    };
    let OpinionMenu = {
        DOMElements: {
            opinionContainer: 0,
            opinionBoxs: 0,
            activeBox: 0,
            opinionHeaders: 0,
            nav: 0,
            button: 0,
            list: 0,
            listButtons: 0,
        },
        setElements: () => {
            let opinionContainer = $(".opinion_container");
            if(opinionContainer.length > 0){
                let opinionBoxs = opinionContainer.find(".opinion_box");
                let activeBox = opinionContainer.find(".opinion_box_active");
                let opinionHeaders = opinionBoxs.find("h3");
                let nav = $(".reviews_nav");
                let button = nav.find(".reviews_button");
                let list = nav.find(".opinion_list");
                OpinionMenu.DOMElements.opinionContainer = opinionContainer;
                OpinionMenu.DOMElements.activeBox = activeBox;
                OpinionMenu.DOMElements.opinionBoxs = opinionBoxs;
                OpinionMenu.DOMElements.opinionHeaders = opinionHeaders;
                OpinionMenu.DOMElements.nav = nav;
                OpinionMenu.DOMElements.button = button;
                OpinionMenu.DOMElements.list = list;
                return true;
            }
            else{
                return false;
            }
        },
        setButtons: () => {
            if(OpinionMenu.setElements()){
                let opinionBoxs = OpinionMenu.DOMElements.opinionBoxs;
                let opinionHeaders = OpinionMenu.DOMElements.opinionHeaders;
                let list = OpinionMenu.DOMElements.list;
                let button = OpinionMenu.DOMElements.button;
                for (var i = 0; i < opinionBoxs.length; i++) {
                    let header = $(opinionHeaders[i]).text();
                    let newLi = $("<li>");
                    let nav = OpinionMenu.DOMElements.nav;
                    if($(opinionBoxs[i]).hasClass("opinion_box_active")){
                        newLi.addClass("opinion_active");
                    }
                    let newButton = $("<a href='#'>")
                    newButton.text(header);
                    newLi.append(newButton);
                    let box = $(opinionBoxs[i]);
                    newLi.on('click', (event) => {
                        event.preventDefault();
                        let activeBox = OpinionMenu.DOMElements.activeBox;
                        if(!(newLi.hasClass("opinion_active"))){
                            let opinionActive =$(".opinion_active");
                            opinionActive.removeClass("opinion_active");
                            newLi.addClass("opinion_active");
                            activeBox.animate({
                                opacity: 0,
                            }, 300, function(){
                                activeBox.removeClass("opinion_box_active");
                                box.css("opacity", 0);
                                box.addClass("opinion_box_active");
                                box.animate({
                                    opacity: 1,
                                }, 300);
                            });
                            OpinionMenu.DOMElements.activeBox = box;
                        }
                    })
                    list.append(newLi);
                }
                if (opinionBoxs.length > 4) {
                    let nav = OpinionMenu.DOMElements.nav;
                    let navMargin = parseInt(nav.css("margin-top"));
                    let li = $(".opinion_active");
                    let liHeight = parseInt(li.css("height"));
                    let liMargin = parseInt(li.css("margin-bottom"));
                    let newMargin = navMargin - ((liHeight + liMargin) * (opinionBoxs.length - 4));
                    if(newMargin < 0){
                        newMargin = 0;
                    }
                    nav.css("margin-top", newMargin);
                }
                button.on('click', (event) => {
                    event.preventDefault();
                    let list = $(".opinion_list");
                    let boxs = $(".opinion_box");
                    let buttons = list.find("li");
                    let opinionActive = $(".opinion_active");
                    let activeBox = $(".opinion_box_active");
                    let newLi = $(opinionActive.next());
                    let box = $(activeBox.next());
                    if (newLi.length > 0 && box.length > 0){
                        opinionActive.removeClass("opinion_active");
                        newLi.addClass("opinion_active");
                        activeBox.animate({
                            opacity: 0,
                        }, 300, function(){
                            activeBox.removeClass("opinion_box_active");
                            box.css("opacity", 0);
                            box.addClass("opinion_box_active");
                            box.animate({
                                opacity: 1,
                            }, 300);
                        });
                    }
                    else{
                        newLi = $(buttons[0]);
                        box = $(boxs[0]);
                        opinionActive.removeClass("opinion_active");
                        newLi.addClass("opinion_active");
                        activeBox.animate({
                            opacity: 0,
                        }, 300, function(){
                            activeBox.removeClass("opinion_box_active");
                            box.css("opacity", 0);
                            box.addClass("opinion_box_active");
                            box.animate({
                                opacity: 1,
                            }, 300);
                        });
                    }
                    OpinionMenu.DOMElements.activeBox = box;
                });
            }
        },
    };
    let Popup = {
        DOMElements:{
            buttons: $(".popup_button"),
            popupBox: $(".popup_box"),
            exitBut: $(".button_exit"),
            body: $("body"),
        },
        setButtons: () => {
            let buttons = Popup.DOMElements.buttons;
            let popup = Popup.DOMElements.popupBox;
            let exitBut = Popup.DOMElements.exitBut;
            let body = Popup.DOMElements.body;
            buttons.on('click', (event) => {
                event.preventDefault();
                let windowWidth = $(window).width();
                let windowHeight = $(window).height();
                if(windowWidth > windowHeight && windowWidth < 768){
                    popup.addClass("popup_box_horizontal");
                }
                popup.css("left", -(windowWidth * 10)).css("display", "block");
                popup.animate({
                    left: 0,
                }, 600);
            });
            exitBut.on('click', (event) => {
                event.preventDefault();
                let windowWidth = $(window).width();
                let windowHeight = $(window).height();
                popup.animate({
                    left: -(windowWidth * 10),
                }, 1000, () =>{
                    popup.css("display", "none");
                    popup.removeClass("popup_box_horizontal");
                    //body.removeClass("stop_scroll");
                });
            })
        },
        setResize: () => {
            let windowWidth = $(window).width();
            let windowHeight = $(window).height();
            let popup = Popup.DOMElements.popupBox;
            if (windowWidth < 768){
                if(windowWidth > windowHeight){
                    popup.addClass("popup_box_horizontal");
                }
                else{
                    popup.removeClass("popup_box_horizontal");
                }
            }
            else{
                popup.removeClass("popup_box_horizontal");
            }
        },
    };
    let Gallery = {
        DOMElements: {
            body: $("body"),
            realizationContainer: 0,
            realizationPhoto: 0,
            realizationDescription: 0,
            realizationsBox: 0,
            header: 0,
            serviceList: 0,
            description: 0,
            activeBox: 0,
            loadButtonBox: 0,
            loadButton:0,
        },
        State: {
            sliderCounter: 0,
            fullscreen: false,
            allRealizations: null,
            sliderArr: [],
            filteredArr: [],
            sliderRealizationsActive: false,
            visBoxCounter: 0,
            indexSlider: false,
        },
        saveRealizations: (response) => {
            Gallery.State.allRealizations = response;
        },
        loadAllRealizations: () => {
            $.ajax({
                url: "static/realizations/realizations.json",
            }).done(function(response){
                let newResponse = JSON.parse(response);

                Gallery.saveRealizations(newResponse.Realizations);
                Gallery.setGallery(Gallery.State.allRealizations);
                Gallery.setElements();
                Gallery.setActiveBox();
                Gallery.setRealizationBox();
                Gallery.setLoadButton();
                Gallery.setRealizationSlider();
            }).fail(function(error){
                console.log(error);
            })
        },
        setActiveBox: () =>{
            let activeBox = $(Gallery.DOMElements.activeBox);
            let activeName = activeBox.find("h3").text();
            let realizationsArr = $(Gallery.State.allRealizations);
            let realizationsHeader = $(Gallery.DOMElements.header);
            let realizationPhoto = $(Gallery.DOMElements.realizationPhoto);
            let serviceList = Gallery.DOMElements.serviceList;
            realizationPhoto.html("");
            realizationsArr.each(function(){
                if(this.name == activeName){
                    let newHeader = this.name;
                    let images = $(this.images);
                    let services = this.services;
                    let serviceLook = $(services.look);
                    let serviceInterior = $(services.interior);
                    let newList = $("<ul>");
                    let navButtonNext = $("<a href='#' class='slider_button_next'>");
                    let newDivNext = $("<div>");
                    let newButImgNext = $("<img src='static/images/blackArrow.png' alt='>'>");
                    let navButtonPrev = $("<a href='#' class='slider_button_prev'>");
                    let newDivPrev = $("<div>");
                    let newButImgPrev = $("<img src='static/images/blackArrow.png' alt='<'>")
                    let navButtonExit = $("<a href='#' class='slider_button_exit'>");
                    let newButTextExit = "Zamknij";
                    let realizationDescription = $(".realization_description");
                    let oldServiceList = realizationDescription.find("ul");
                    let listDescription = $("<li class='list_text'>Wykonane zabiegi</li>");
                    images.each(function(index){
                        let newImg = $("<img class='gallery_photo'>");
                        newImg.attr("src", 'static/' + this);
                        if(index == 0){
                            newImg.addClass("gallery_photo_main");
                        }
                        realizationPhoto.append(newImg);
                    });
                    newList.append(listDescription);
                    if(serviceLook.length > 0){
                        let lookList = $("<li class='list_look'>");
                        lookList.text("Piękny wygląd: ");
                        let lookServices = $("<ol>");
                        serviceLook.each(function(){
                            let text = this;
                            let newLi = $("<li>");
                            newLi.append(text);
                            lookServices.append(newLi);
                        });
                        lookList.append(lookServices);
                        newList.append(lookList);
                    };
                    if(serviceInterior.length > 0){
                        let interiorList = $("<li class='list_interior'>");
                        interiorList.text("Zadbane wnętrze: ");
                        let interiorServices = $("<ol>");
                        serviceInterior.each(function(){
                            let text = this;
                            let newLi = $("<li>");
                            newLi.append(text);
                            interiorServices.append(newLi);
                        });
                        interiorList.append(interiorServices);
                        newList.append(interiorList);
                    }
                    oldServiceList.remove();
                    realizationDescription.append(newList);
                    realizationsHeader.text(this.name);
                    //Guzik od slidera next
                    newDivNext.append(newButImgNext);
                    navButtonNext.append(newDivNext);
                    realizationPhoto.append(navButtonNext);
                    //Guzik od slider prev
                    newDivPrev.append(newButImgPrev);
                    navButtonPrev.append(newDivPrev);
                    realizationPhoto.append(navButtonPrev);
                    //Guzik od wyjscia z fullscreen
                    navButtonExit.text(newButTextExit);
                    realizationPhoto.append(navButtonExit);
                    Gallery.setGallerySlider();
                }
            });
        },
        setElements: () =>{
            let realizationContainer = $(".realization_container");
            if(realizationContainer.length > 0){
                Gallery.DOMElements.realizationContainer = realizationContainer;
                let realizationPhoto = realizationContainer.find(".realization_photo");
                let realizationDescription = realizationContainer.find(".realization_description");
                let realizationBoxs = $(".realizations_box");
                let header = realizationDescription.find("h3");
                let serviceList = realizationDescription.find("ul");
                let activeBox = $(".active_realization");
                let loadButtonBox = $(".button_box");
                let loadButton = loadButtonBox.find(".button_white");
                Gallery.DOMElements.realizationsBox = realizationBoxs;
                Gallery.DOMElements.realizationDescription = realizationDescription;
                Gallery.DOMElements.realizationPhoto = realizationPhoto;
                Gallery.DOMElements.header = header;
                Gallery.DOMElements.serviceList = serviceList;
                Gallery.DOMElements.activeBox = activeBox;
                Gallery.DOMElements.loadButtonBox = loadButtonBox;
                Gallery.DOMElements.loadButton = loadButton;
                return true;
            }
            else{
                return false;
            }
        },
        setRealizationBox: () =>{
            if(Gallery.setElements()){
                let realizationsBox = $(Gallery.DOMElements.realizationsBox);
                realizationsBox.on('click', (event) => {
                    event.preventDefault();
                    if(Gallery.State.indexSlider){
                        let realizationContainer = $(".realization_container");
                        realizationContainer.slideDown(300);
                        Gallery.State.indexSlider = false;
                    }
                    let eventTarget = $(event.target);
                    let eventParent = eventTarget.parent();
                    let box;
                    let active = $(Gallery.DOMElements.activeBox);
                    active.removeClass("active_realization")
                    if(eventTarget.hasClass("realizations_box")){
                        Gallery.DOMElements.activeBox = eventTarget;
                        box = eventTarget;
                    }
                    else if($(eventTarget).attr("src")){
                        Gallery.DOMElements.activeBox = eventTarget.parent().parent();
                        box = eventTarget.parent().parent();
                    }
                    else if (eventParent.hasClass("realizations_box")){
                        Gallery.DOMElements.activeBox = eventParent;
                        box = eventParent;
                    }
                    box.addClass("active_realization");
                    Gallery.setActiveBox();
                    let realizationCategory = $(".realization_container");
                    let offsetRealization = realizationCategory.offset()
                    let offsetTop = offsetRealization.top;
                    $("html, body").animate({
                        scrollTop: offsetTop,
                    }, 1000)
                })

            }
        },
        setGallerySlider: () =>{
            if(Gallery.setElements()){
                Gallery.State.sliderCounter = 0;
                let sliderBox = Gallery.DOMElements.realizationPhoto;
                let slides = $(sliderBox).find(".gallery_photo");
                let navButtonNext = $(sliderBox).find(".slider_button_next");
                let navButtonPrev = $(sliderBox).find(".slider_button_prev");
                let navButtonExit = $(sliderBox).find(".slider_button_exit");
                for (var i = 0; i < slides.length; i++) {
                    if($(slides[i]).hasClass("gallery_photo_main")){
                        Gallery.State.sliderCounter = i;
                    }
                }
                navButtonNext.on('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    index = Gallery.State.sliderCounter;
                    activeSlide = slides[index];
                    newIndex = index + 1;
                    Gallery.State.sliderCounter++;
                    if(newIndex >= slides.length){
                        newIndex = 0;
                        Gallery.State.sliderCounter = 0;
                    }
                    let nextSlide = slides[newIndex];
                    $(activeSlide).animate({
                        opacity: 0,
                    }, 500, function(){
                        $(this).removeClass("gallery_photo_main");
                    });
                    $(nextSlide).css("display", "block");
                    $(nextSlide).animate({
                        opacity: 1,
                    }, 500, function(){
                        $(this).addClass("gallery_photo_main");
                    })
                });
                navButtonPrev.on('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    index = Gallery.State.sliderCounter;
                    activeSlide = slides[index];
                    newIndex = index - 1;
                    Gallery.State.sliderCounter--;
                    if(newIndex <= -1){
                        newIndex = slides.length -1;
                        Gallery.State.sliderCounter = slides.length -1;
                    }
                    let prevSlide = slides[newIndex];
                    $(activeSlide).animate({
                        opacity: 0,
                    }, 500, function(){
                        $(this).removeClass("gallery_photo_main");
                    });
                    $(prevSlide).css("display", "block");
                    $(prevSlide).animate({
                        opacity: 1,
                    }, 500, function(){
                        $(this).addClass("gallery_photo_main");
                    })
                });
                sliderBox.on('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    sliderBox.addClass("realization_photo_fullscreen");
                    Gallery.State.fullscreen = true;
                });
                navButtonExit.on('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    sliderBox.removeClass("realization_photo_fullscreen");
                    Gallery.State.fullscreen = false;
                });
            };
            if(Gallery.State.indexSlider){
                let slideActive = $(".active_realization");
                slideActive.removeClass("active_realization");
            }
        },
        setLoadButton: () =>{
            if(Gallery.setElements()){
                let loadButton = Gallery.DOMElements.loadButton;
                loadButton.on('click', (event) => {
                    event.preventDefault();
                    let realizationsBox = Gallery.DOMElements.realizationsBox;
                    let visBoxsLength = realizationsBox.length;
                    let unvisBoxs = [];
                    let windowWidth = $(window).width();
                    let loadCounter = 3;
                    realizationsBox.each(function(){
                        if($(this).css("display") == "none"){
                            unvisBoxs.push(this);
                        }
                    });
                    if(unvisBoxs.length > 0){
                        if(loadCounter > unvisBoxs.length){
                            loadCounter = unvisBoxs.length;
                        }
                        for (var i = 0; i < loadCounter; i++) {
                            let box = $(unvisBoxs[i]);
                            box.slideDown(600);
                            box.removeClass("gallery_unvis");
                        }
                        if(loadCounter == unvisBoxs.length){
                            loadButton.addClass("button_off");
                        }
                    }
                    else if(unvisBoxs.length == 0){
                        loadButton.addClass("button_off");
                    }
                })
            }
        },
        setGallery: (arr) =>{
            let sliderArr = Gallery.State.sliderArr;
            let slideLength = arr.length;
            let sliderBox = $(".realizations_slider");
            let sectionRealizations = $(".section_realizations");
            if(sliderBox.hasClass("slider_active")){
                Gallery.State.sliderRealizationsActive = true;
            }
            if(sectionRealizations.hasClass("index_slider")){
                Gallery.State.indexSlider = true;
            }
            let windowWidth = $(window).width();
            let visBoxCounter = 3;
            if(windowWidth < 768 && Gallery.State.sliderRealizationsActive){
                visBoxCounter = 1;
            }
            Gallery.State.visBoxCounter = visBoxCounter;
            for (var i=0; i< arr.length; i++) {
                var j = Math.floor(Math.random() * arr.length);
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            $(arr).each(function(){
                let realizationName = this.name;
                let realizationImages = this.images;
                let newArticle = $("<article class='realizations_box col-1 gallery_unvis'>");
                let newPhotoDiv = $("<div class='realizations_photo'>");
                let newMiniature = $("<img class='min_photo'>");
                let newHeader = $("<h3>");
                for (var i=0; i< realizationImages.length; i++) {
                    var j = Math.floor(Math.random() * realizationImages.length);
                    var temp = realizationImages[i];
                    realizationImages[i] = realizationImages[j];
                    realizationImages[j] = temp;
                }
                newMiniature.attr("src", 'static/' + realizationImages[0]);
                newPhotoDiv.append(newMiniature);
                newArticle.append(newPhotoDiv);
                newHeader.text(realizationName);
                newArticle.append(newHeader);
                sliderBox.append(newArticle);
            });
            let boxs = $(".realizations_box");
            for (var i = 0; i < visBoxCounter; i++) {
                let box = $(boxs[i]);
                if(i == 0){
                    box.addClass("active_realization");
                    box.addClass("slide_active");
                    box.removeClass("gallery_unvis");
                }
                box.removeClass("gallery_unvis");
            }
        },
        setSliderSize: () =>{
            if(Gallery.State.sliderRealizationsActive){
                Gallery.setSlides();
                let windowWidth = $(window).width();
                let box = $(".realizations_box");
                let boxHeight = box.css("height");
                let visBoxCounter = Gallery.State.visBoxCounter;
                let newBoxCounter;
                if(windowWidth < 768){
                    newBoxCounter = 1;
                }
                else if(windowWidth >= 768){
                    newBoxCounter = 3;
                }
                if(newBoxCounter != visBoxCounter){
                    let slides = $(".realizations_box");
                    let activeSlides = [];
                    let activeSlide;
                    if(newBoxCounter == 3){
                        slides.each(function(){
                            if(!($(this).hasClass("gallery_unvis"))){
                                activeSlide = $(this);
                            }
                        })
                        let secondSlide = activeSlide.next()
                        let thirdSlide = activeSlide.next().next()
                        if(secondSlide.hasClass("slider_realization_next")){
                            secondSlide = $(slides[0]);
                        }
                        if(thirdSlide.hasClass("slider_realization_next")){
                            thirdSlide = $(slides[0]);
                        }
                        if(thirdSlide.length == 0){
                            thirdSlide = $(slides[1]);
                        }
                        secondSlide.removeClass("gallery_unvis");
                        thirdSlide.removeClass("gallery_unvis");
                        Gallery.State.visBoxCounter = 3;
                        Gallery.setSlides();
                    }
                    else if(newBoxCounter == 1){
                        slides.each(function(){
                            if(!($(this).hasClass("gallery_unvis"))){
                                activeSlides.push($(this));
                            }
                        })
                        for (var i = 0; i < activeSlides.length; i++) {
                            if(i == 0){
                                $(activeSlides[i]).removeClass("realizations_slide");
                            }
                            else{

                                $(activeSlides[i]).addClass("gallery_unvis");
                            }
                        }
                        Gallery.State.visBoxCounter = 1;
                        Gallery.setSlides();
                    }
                }
            }

        },
        setRealizationSlider: () =>{
            let sliderActive = Gallery.State.sliderRealizationsActive;
            if(sliderActive){
                let slider = $(".realizations_slider");
                let navButtonNext = $("<a href='#' class='slider_realization_next'>");
                let newDivNext = $("<div>");
                let newButImgNext = $("<img src='static/images/blackArrow.png' alt='>'>");
                let navButtonPrev = $("<a href='#' class='slider_button_prev'>");
                newDivNext.append(newButImgNext);
                navButtonNext.append(newDivNext);
                slider.append(navButtonNext);
                navButtonNext.on('click', (event) => {
                    event.preventDefault();
                    Gallery.setSliderSize();
                    Gallery.setSlides();
                    let windowWidth = $(window).width();
                    let visBoxCounter = Gallery.State.visBoxCounter;
                    let slides = $(".realizations_box");
                    let activeSlides = [];
                    slides.each(function(){
                        if(!($(this).hasClass("gallery_unvis"))){
                            activeSlides.push($(this));
                        }
                    });
                    if(visBoxCounter == 1){;
                        let activeSlide = $(activeSlides[0]);
                        let slider = $(".slider_active");
                        let slideWidth = activeSlide.css("width");
                        let slideHeight = activeSlide.css("height");
                        let nextSlide = $(activeSlides[0]).next()
                        if(!(nextSlide.hasClass("realizations_box"))){
                            nextSlide = $(slides[0]);
                        };
                        slider.css("height", slideHeight).css("width", slideWidth);
                        nextSlide.addClass("realizations_slide");
                        nextSlide.removeClass("gallery_unvis");
                        nextSlide.css("left", windowWidth).css("width", windowWidth).css("z-index", "2");
                        activeSlide.addClass("realizations_slide");
                        activeSlide.css("z-index", "1").css("width", windowWidth);
                        activeSlide.animate({
                            left: -windowWidth,
                        }, 300, ()=>{
                            activeSlide.css("width", "");
                            activeSlide.addClass("gallery_unvis");
                            activeSlide.removeClass("realizations_slide");
                            activeSlide.removeClass("slide_active");
                        });
                        nextSlide.animate({
                            left: 0,
                        },300, ()=>{
                            nextSlide.removeClass("realizations_slide");
                            nextSlide.addClass("slide_active");
                            nextSlide.css("width", "");
                            slider.css("height", "").css("width", "");
                        });
                    }
                    else if(visBoxCounter == 3) {
                        let slider = $(".slider_active");
                        let activeSlide = $(".slide_active");
                        let slideWidth = activeSlide.css("width");
                        let slideHeight = activeSlide.css("height");
                        let secondSlide = activeSlide.next()
                        let thirdSlide = activeSlide.next().next();
                        if(secondSlide.hasClass("slider_realization_next")){
                            secondSlide = $(slides[0]);
                        }
                        if(thirdSlide.hasClass("slider_realization_next")){
                            thirdSlide = $(slides[0]);
                        }
                        if(thirdSlide.length == 0){
                            thirdSlide = $(slides[1]);
                        }
                        let nextSlide = thirdSlide.next();
                        if(nextSlide.hasClass("slider_realization_next")){
                            nextSlide = $(slides[0]);
                        }
                        slider.css("width", slideWidth * 3);

                        activeSlide.addClass("realizations_slide");
                        activeSlide.css("width", slideWidth);
                        activeSlide.removeClass("slide_active");

                        secondSlide.removeClass("realizations_slide");
                        secondSlide.css("margin-left", slideWidth);
                        secondSlide.addClass("slide_active");

                        nextSlide.addClass("realizations_slide");
                        nextSlide.removeClass("gallery_unvis");
                        nextSlide.css("left", windowWidth).css("width", "").css("z-index", "2");


                        activeSlide.animate({
                            left: -(parseFloat(slideWidth)),
                        }, 300, ()=>{
                            activeSlide.css("width", "");
                            activeSlide.addClass("gallery_unvis");
                            activeSlide.removeClass("realizations_slide");
                            activeSlide.removeClass("slide_active");
                        });
                        secondSlide.animate({
                            left: 0,
                            marginLeft: 0,
                        }, 300, ()=>{
                            secondSlide.removeClass("realizations_slide");
                            secondSlide.addClass("slide_active");
                            secondSlide.css("width", "");
                        });
                        thirdSlide.animate({
                            left: parseFloat(slideWidth),
                        }, 300);
                        nextSlide.animate({
                            left: parseFloat(slideWidth) * 2,
                        },300);
                    }
                })
            }
        },
        setSlides: () =>{
            let activeSlide = $(".slide_active");
            let slides = $(".realizations_box");
            let secondSlide = activeSlide.next();
            let thirdSlide = activeSlide.next().next();
            if(secondSlide.hasClass("slider_realization_next")){
                secondSlide = $(slides[0]);
            }
            if(thirdSlide.hasClass("slider_realization_next")){
                thirdSlide = $(slides[0]);
            }
            if(thirdSlide.length == 0){
                thirdSlide = $(slides[1]);
            }
            let slideWidth = parseFloat(activeSlide.css("width"));
            secondSlide.addClass("realizations_slide").css("left", slideWidth);
            thirdSlide.addClass("realizations_slide").css("left", slideWidth * 2);
        },
    }
    MobileMenu.setButton();
    ServiceMenu.setButtons();
    CategoryMenu.setButtons();
    CategoryMenu.setServiceSelect();
    OpinionMenu.setButtons();
    Popup.setButtons();
    Gallery.loadAllRealizations();

    $(window).on('resize', (event) => {
        MobileMenu.setResize();
        ServiceMenu.setResize();
        CategoryMenu.setResize();
        Popup.setResize();
        Gallery.setSliderSize();
    })

});
