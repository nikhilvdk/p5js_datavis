var pagex = 1260;
var pagey = 660;
let myMap;
let canvas;
var locationpts;
const mappa = new Mappa('Google','AIzaSyDrayGYspoCUFliVyv8-haJmaV0hxbdxfo');

const options = {
  lat: 40.781581,
  lng: -73.941422,
  zoom: 12,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload() {
    table = loadTable("data/party_in_nyc.csv", "header");
  }


  function setup(){
  canvas = createCanvas(pagex,pagey); 

  // tile map
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);
  loadData();
  myMap.onChange(drawpts);
}


function draw(){
    for (var i = 0; i < locationpts.length; i++) {
        locationpts[i].rollover(mouseX, mouseY);
      }

}

function loadData(){
    locationpts =[];

    for (var i = 0; i < 500; i++) {
        var row = table.getRow(i);
        var lat = row.get(6);
        var lon = row.get(7);
        var type = row.get(2);
        locationpts[i] = new Loc(lat,lon,type);
    }
}

class Loc{
    constructor(lat,lon,type){
        this.lat = lat;
        this.lon = lon;
        this.type = type;
        this.over = false;
    }


    display(){
        noStroke();
        var ptpos = myMap.latLngToPixel(this.lat, this.lon);
        
        if(this.type==="Residential Building/House"){
            fill('red');
        }
        if(this.type==="Store/Commercial"){
            fill('blue');
        }
        if(this.type==="Street/Sidewalk"){
            fill('orange');
        }
        if(this.type==="House of Worship"){
            fill('green');
        }
        if(this.type==="Club/Bar/Restaurant"){
            fill('black');
        }

        ellipse(ptpos.x, ptpos.y, 5, 5);
        
    }

    rollover(px, py) {

        var ptpos = myMap.latLngToPixel(this.lat, this.lon);

        var d = dist(ptpos.x, ptpos.y, px, py);
        
        if (d < 2) {
          this.over = true;
          textAlign(CENTER);
          noStroke();
          fill(0);
          textSize(8);
          text(this.type, ptpos.x, ptpos.y + 22);

        } else {
          this.over = false;
          text('');
        }
      }
    
}

function drawpts(){
    clear();
    for (var i = 0; i < locationpts.length; i++) {
        locationpts[i].display();
      }
}