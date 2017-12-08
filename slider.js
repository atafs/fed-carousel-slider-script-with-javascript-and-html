var carousel = function() {
    var slider = document.getElementById('slider');
    var slider_images = slider.getElementsByTagName('img');
    var main = document.getElementById('slider_main');
    var img_caption = document.getElementById('slider_caption');
    var nav = document.getElementById('slider_nav');
    var active;
    var timing = 8000;

    function set_active_nav(el) {
        if (active) { active.id = ""; }
        el.id = "active";
        active = el;

        console.log('active', active);
    }

    function set_next_index() {
        var current_index = active.getAttribute("data-index");
        current_index++;
        if (current_index === slider_images.length) { current_index = 0;}

        console.log('current_index', current_index);
        return current_index;
    }

    function set_active_img(index) {
        img_caption.innerHTML = slider_images[index].title;
        main.style.marginLeft = "-" + index + "00%";
    }

    function display_slider(index) {
        set_active_img(index);
        set_active_nav(nav.children[index]);
    }
    
    function make_carousel() {
        if(slider) {
            var images_length = slider_images.length;
            if (images_length === 0) { return; }
            main.style.width = 100 * images_length + "%";

            for (var i = 0; i < images_length; i++) {
                slider_images[i].style.width = 100 / images_length + "%";

                var link = document.createElement("a");
                link.setAttribute('data-index', i);

                if (i === 0) {
                    img_caption.innerHTML = slider_images[i].title;
                    set_active_nav(link);
                }

                 //click on circles
                link.onclick = function() {
                    display_slider(this.getAttribute('data-index'));
                }

                //navigation dot bars
                nav.appendChild(link);
            }

            slider.onclick = function() {
                display_slider(set_next_index());
                
            }
        }

        setInterval(function(){
            display_slider(set_next_index());
        },timing);

    } 

    return {
        make_carousel: make_carousel
    };
}();

carousel.make_carousel();

