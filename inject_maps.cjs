const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Maps Script to Head
if (!html.includes('maps.googleapis.com')) {
  html = html.replace('</head>', '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBm0fsmZqqwy9ZkBhjP9lubSlOlQA9MW0Q&callback=initMap" async defer></script></head>');
}

// 2. Replace static Unsplash backgrounds with Google Map containers
html = html.replace(/<div class="absolute inset-0 bg-\[url\('https:\/\/images\.unsplash\.com.*?><\/div>/g, '<div class="api-map absolute inset-0 w-full h-full z-0"></div>');

// 3. Replace static Google Maps iframes with Google Map containers
html = html.replace(/<iframe src="https:\/\/maps\.google\.com\/maps\?q=Manhattan.*?<\/iframe>/g, '<div class="api-map absolute inset-0 w-full h-full z-0"></div>');

// 4. Add the initMap function
const mapJs = `
    <script>
      let globalGoogleMap;
      let panelMaps = [];
      window.initMap = function() {
         const darkStyle = [ { elementType: 'geometry', stylers: [{color: '#242f3e'}] }, { elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}] }, { elementType: 'labels.text.fill', stylers: [{color: '#746855'}] }, { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'poi.park', elementType: 'geometry', stylers: [{color: '#263c3f'}] }, { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{color: '#6b9a76'}] }, { featureType: 'road', elementType: 'geometry', stylers: [{color: '#38414e'}] }, { featureType: 'road', elementType: 'geometry.stroke', stylers: [{color: '#212a37'}] }, { featureType: 'road', elementType: 'labels.text.fill', stylers: [{color: '#9ca5b3'}] }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{color: '#746855'}] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{color: '#1f2835'}] }, { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{color: '#f3d19c'}] }, { featureType: 'transit', elementType: 'geometry', stylers: [{color: '#2f3948'}] }, { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}] }, { featureType: 'water', elementType: 'geometry', stylers: [{color: '#17263c'}] }, { featureType: 'water', elementType: 'labels.text.fill', stylers: [{color: '#515c6d'}] }, { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{color: '#17263c'}] } ];
         const lightStyle = [ { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e9e9e9' }, { lightness: 17 }] }, { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 20 }] }, { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }, { lightness: 17 }] }, { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }] }, { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#ffffff' }, { lightness: 18 }] }, { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#ffffff' }, { lightness: 16 }] }, { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 21 }] }, { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#dedede' }, { lightness: 21 }] }, { elementType: 'labels.text.stroke', stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }] }, { elementType: 'labels.text.fill', stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }] }, { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }, { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#f2f2f2' }, { lightness: 19 }] }, { featureType: 'administrative', elementType: 'geometry.fill', stylers: [{ color: '#fefefe' }, { lightness: 20 }] }, { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }] } ];

         const isDark = document.documentElement.classList.contains('dark');
         
         const apiMapElements = document.querySelectorAll('.api-map');
         apiMapElements.forEach(el => {
            const map = new google.maps.Map(el, {
               center: { lat: 40.7128, lng: -74.0060 },
               zoom: 14,
               disableDefaultUI: true,
               styles: isDark ? darkStyle : lightStyle
            });
            panelMaps.push(map);
         });
         
         // Observer for theme toggle
         const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
               if (mutation.attributeName === 'class') {
                  const isDark = document.documentElement.classList.contains('dark');
                  const currentStyle = isDark ? darkStyle : lightStyle;
                  panelMaps.forEach(map => map.setOptions({ styles: currentStyle }));
               }
            });
         });
         observer.observe(document.documentElement, { attributes: true });
      };
    </script>
`;

if (!html.includes('window.initMap')) {
  html = html.replace('</body>', mapJs + '\\n  </body>');
}

fs.writeFileSync('index.html', html);
console.log('Done!');
