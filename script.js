


let enterButton = document.getElementsByClassName('enterButton'); 

enterButton[0].addEventListener('click', myPlay); 

function myPlay() {
    var scaryEnterSound = document.getElementsByClassName('scaryEnterSound');
    scaryEnterSound[0].play();
} ;

/* eyeball function on mainpage */
const balls = document.getElementsByClassName("ball");
document.onmousemove = function () {
    let x = event.clientX * 100 / window.innerWidth + "%";
    let y = event.clientY * 100 / window.innerHeight + "%";
    // event.cilentX => get the horizontal coordinate of the mouse
    // event.cilentY => get the vertical coordinate of the mouse
    // window.innerWidth => get the browser width
    // window.innerHeight => get the browser height

    for (let i = 0; i < 2; i++) {
        balls[i].style.left = x;
        balls[i].style.top = y;
        balls[i].style.transform = "translate(-" + x + ", -" + y + ")";
    }
}
/* gallery function test */
const galleryItems = [
  "assets/images/meme1.png",
  "assets/images/meme2.jpg",
  "assets/images/meme3.jpg",
  "assets/images/meme1.png",
  "assets/images/meme2.jpg",
  "assets/images/meme3.jpg",
  "assets/images/meme1.png",
  "assets/images/meme2.jpg",
  "assets/images/meme3.jpg",
  "assets/images/meme1.png",
  "assets/images/meme2.jpg",
  "assets/images/meme3.jpg",
  "assets/images/meme3.jpg",
];

const galleryContainer = document.querySelector('.gallery');

galleryItems.forEach((src) => {
  const item = document.createElement('div');
  item.classList.add('gallery-item');

  const image = document.createElement('img');
  image.src = src;

  item.appendChild(image);
  galleryContainer.appendChild(item);

  image.addEventListener('click', () => {
    showBiggerImage(src);
  });
});

function showBiggerImage(src) {
  const biggerImageContainer = document.createElement('div');
  biggerImageContainer.classList.add('bigger-image');

  const image = document.createElement('img');
  image.src = src;

  biggerImageContainer.appendChild(image);
  document.body.appendChild(biggerImageContainer);

  biggerImageContainer.addEventListener('click', () => {
    document.body.removeChild(biggerImageContainer);
  });
}

/* functions for meme page gallery */
let modalId = $('#image-gallery');

$(document)
  .ready(function () {

    loadGallery(true, 'a.thumbnail');

    /* This function disables buttons when needed */
     function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
$(document)
  .keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
          $('#show-previous-image')
            .click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
          $('#show-next-image')
            .click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

