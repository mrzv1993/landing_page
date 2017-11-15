jQuery(document).ready(function ($) {
  //set your google maps parameters
  var latitude = 43.118930,
    longitude = 131.884818,
    map_zoom = 18;

  //google map custom marker icon - .png fallback for IE11
  var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
  var marker_url = (is_internetExplorer11) ? '/img.pencil.png' : '/img/pencil.png';

  //define the basic color of your map, plus a value for saturation and brightness
  var main_color = '#2d313f',
    saturation_value = -20,
    brightness_value = 5;
  //we define here the style of the map
  var style = [
    {
      //set saturation for the labels on the map
      elementType: "labels",
      stylers: [
        {
          saturation: saturation_value
        }
			]
		},
    { //poi stands for point of interest - don't show these lables on the map
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
			]
		},
    {
      //don't show highways lables on the map
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [
        {
          visibility: "off"
        }
	        ]
	    },
    {
      //don't show local road lables on the map
      featureType: "road.local",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
			]
		},
    {
      //don't show arterial road lables on the map
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
			]
		},
    {
      //don't show road lables on the map
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "off"
        }
			]
		},
		//style different elements on the map
    {
      featureType: "transit",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		},
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		},
    {
      featureType: "poi.government",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		},
    {
      featureType: "poi.sport_complex",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		},
    {
      featureType: "poi.attraction",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		},
    {
      featureType: "poi.business",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		},
    {
      featureType: "transit",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		},
    {
      featureType: "transit.station",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		},
    {
      featureType: "landscape",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]

		},
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		},
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		},
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          hue: main_color
        },
        {
          visibility: "on"
        },
        {
          lightness: brightness_value
        },
        {
          saturation: saturation_value
        }
			]
		}
	];

  //set google map options
  var map_options = {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: map_zoom,
    panControl: false,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    styles: style,
  }
  //inizialize the map
  var map = new google.maps.Map(document.getElementById('map'), map_options);
  //add a custom marker to the map
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
    visible: true,
    icon: marker_url,
  });

  //add custom buttons for the zoom-in/zoom-out on the map
  function CustomZoomControl(controlDiv, map) {
    //grap the zoom elements from the DOM and insert them in the map
    var controlUIzoomIn = document.getElementById('cd-zoom-in'),
      controlUIzoomOut = document.getElementById('cd-zoom-out');
    controlDiv.appendChild(controlUIzoomIn);
    controlDiv.appendChild(controlUIzoomOut);

    // Setup the click event listeners and zoom-in or out according to the clicked element
    google.maps.event.addDomListener(controlUIzoomIn, 'click', function () {
      map.setZoom(map.getZoom() + 1)
    });
    google.maps.event.addDomListener(controlUIzoomOut, 'click', function () {
      map.setZoom(map.getZoom() - 1)
    });
  }

  var zoomControlDiv = document.createElement('div');
  var zoomControl = new CustomZoomControl(zoomControlDiv, map);

  //insert the zoom div on the top left of the map
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
});

// сайт

var login = document.querySelector(".login");
var popup = document.querySelector(".modal-content");
var close = document.querySelector(".modal-content-close");
var overlay = document.querySelector(".modal-overlay");
login.addEventListener("click", function (event) {
  popup.classList.add("modal-content-show");
  overlay.classList.add("modal-overlay-show");
});
close.addEventListener("click", function (ever) {
  popup.classList.remove("modal-content-show");
  overlay.classList.remove("modal-overlay-show");
});
//Поиск
var search = document.querySelector(".search button");
var search_open = document.querySelector(".search-input");
search.addEventListener("click", function (event) {
  search.classList.add("search-button-active");
});
search.addEventListener("click", function (event) {
  search_open.classList.add("search-input-open");
  document.classList.remove("search-input-open");
});
//Слайдер
var header = document.querySelector("header");
var color1 = document.querySelector(".slider-header li:nth-child(1) button");
var color2 = document.querySelector(".slider-header li:nth-child(2) button");
var color3 = document.querySelector(".slider-header li:nth-child(3) button");
var gamepad = document.querySelector(".gamepad-show");
var grammophone = document.querySelector(".grammophone-none");
var drummer = document.querySelector(".drummer-none");
color1.addEventListener("click", function (event) {
  gamepad.classList.remove("gamepad-none");
  grammophone.classList.remove("grammophone-show");
  drummer.classList.remove("drummer-show");
});
color2.addEventListener("click", function (event) {
  grammophone.classList.add("grammophone-show");
  gamepad.classList.add("gamepad-none");
  drummer.classList.remove("drummer-show");
});
color3.addEventListener("click", function (event) {
  drummer.classList.add("drummer-show");
  gamepad.classList.add("gamepad-none");
  grammophone.classList.remove("grammophone-show");
});
color1.addEventListener("click", function (event) {
  header.classList.add("header-bg-1");
  header.classList.remove("header-bg-2", "header-bg-3");
});
color2.addEventListener("click", function (event) {
  header.classList.add("header-bg-2");
  header.classList.remove("header-bg-1", "header-bg-3");
});
color3.addEventListener("click", function (event) {
  header.classList.add("header-bg-3");
  header.classList.remove("header-bg-1", "header-bg-2");
});
color1.addEventListener("click", function (event) {
  color1.classList.add("slider-circle-active");
  color2.classList.remove("slider-circle-active");
  color3.classList.remove("slider-circle-active");
});
color2.addEventListener("click", function (event) {
  color2.classList.add("slider-circle-active");
  color1.classList.remove("slider-circle-active");
  color3.classList.remove("slider-circle-active");
});
color3.addEventListener("click", function (event) {
  color3.classList.add("slider-circle-active");
  color1.classList.remove("slider-circle-active");
  color2.classList.remove("slider-circle-active");
});
