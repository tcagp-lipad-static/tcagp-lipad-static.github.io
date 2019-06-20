function zoom_to_box(map, bbox){
  var bounds = [
  [bbox[1], bbox[0]],
  [bbox[3], bbox[2]]
  ];
  map.fitBounds(bounds);
//map.zoomIn(0);
}

window.onload=function(){
  var d = new Date();
  var n = d.getFullYear();
  var center = [13.0933418, 121.4767572];
  var map = L.map('map').setView(center, 6);;
  zoom_to_box(map, [117.17427453, 5.58100332277, 126.537423944, 18.5052273625]);

  tile_layer = L.tileLayer.wms('https://lipad.dream.upd.edu.ph/geoserver/wms', {
    ptype: "gxp_wmsgetfeatureinfo",
    layers: 'geonode:philgrid',
    format: 'image/png',
    transparent: true,
    'opacity':1,
    tiled:true,
    visibility:true,
    continuousWorld: true,
  }).addTo(map).bringToFront();

  // apply local osm group as overlay
  osm_map = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data ©'+ n +' <a href="http://osm.org/copyright">OpenStreetMap</a> and contributors',
      maxZoom: 18
    }).addTo(map).bringToBack();

  var fhms_5yr = L.tileLayer.wms('https://lipad-fmc.dream.upd.edu.ph/geoserver/ows?', {
    ptype: 'gxp_wmsgetfeatureinfo',
    layers: 'geonode:fhms_5yr',
    format: 'image/png',
    transparent: true,
    'opacity': 1,
    tiled: true,
    visibility: true,
    continuousWorld: true
  });

  var fhms_25yr = L.tileLayer.wms('https://lipad-fmc.dream.upd.edu.ph/geoserver/ows?', {
    ptype: 'gxp_wmsgetfeatureinfo',
    layers: 'geonode:fhms_25yr',
    format: 'image/png',
    transparent: true,
    'opacity': 1,
    tiled: true,
    visibility: true,
    continuousWorld: true
  });

  var fhms_100yr = L.tileLayer.wms('https://lipad-fmc.dream.upd.edu.ph/geoserver/ows?', {
    ptype: 'gxp_wmsgetfeatureinfo',
    layers: 'geonode:fhms_100yr',
    format: 'image/png',
    transparent: true,
    'opacity': 1,
    visibility: true,
    continuousWorld: true
  });

  var baseMaps = {
    'OpenStreetMap' : osm_map
  };

  var overlays = {
    'Data Coverage': tile_layer,
    'Flood Hazard Maps 5yr': fhms_5yr,
    'Flood Hazard Maps 25yr': fhms_25yr,
    'Flood Hazard Maps 100yr': fhms_100yr
  };
  // L.control.layers(overlays, null, {collapsed: false}).addTo(map);
  //map.layerscontrol.removeFrom(map);

  var legend = L.control({position:'bottomleft'});
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<div class="w3-white"><p class="w3-medium"> Legend: </p><p><img id="legend_icon" src="static/philgrid_legend.png"></p></div>';
    return div;
  };

  legend.addTo(map);

  L.control.layers(baseMaps, overlays, {collapsed: false}).addTo(map);
  L.control.scale({position: 'bottomright'}).addTo(map);

  
  var loc_map = L.map('map-canvas').setView([14.65668, 121.07116], 18);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy;' + n + ' <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(loc_map);
  // add marker to the maps
  marker = L.marker([14.65652, 121.071]).addTo(loc_map);
  // add popup to the marker
  marker.bindPopup("<b>UP TCAGP - DREAM/PHIL-LiDAR 1 Office").openPopup()

}