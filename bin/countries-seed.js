'use strict';

const Country = require('../models/Country');

const mongoose = require('mongoose'); //

mongoose.connect('mongodb://localhost/backpackingwithme', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const countries = [
  {
    name: 'England',
    city: 'London',
    code: 'LGW',
    image: '/image/london.jpg',
    description: 'London is the capital of and largest city in England and the United Kingdom, with the largest municipal population in the European Union.[7][8] Standing on the River Thames in the south-east of England, at the head of its 50-mile (80 km) estuary leading to the North Sea, London has been a major settlement for two millennia. Londinium was founded by the Romans.[9] The City of London, London\'s ancient core − an area of just 1.12 square miles (2.9 km2) and colloquially known as the Square Mile − retains boundaries that follow closely its medieval limits. The City of Westminster is also an Inner London borough holding city status. Greater London is governed by the Mayor of London and the London Assembly.'
  },
  {
    name: 'Russia',
    city: 'Moscow',
    code: 'DME',
    image: '/image/moscow.jpg',
    description: 'Moscow is the major political, economic, cultural, and scientific center of Russia and Eastern Europe, as well as the largest city (both by population and by area) entirely on the European continent. By broader definitions, Moscow is among the world\'s largest cities, being the 14th largest metro area, the 18th largest agglomeration, the 14th largest urban area, and the 11th largest by population within city limits worldwide. According to Forbes 2013, Moscow has been ranked as the ninth most expensive city in the world by Mercer and has one of the world\'s largest urban economies, being ranked as an alpha global city according to the Globalization and World Cities Research Network, and is also one of the fastest growing tourist destinations in the world according to the MasterCard Global Destination Cities Index.'
  },
  {
    name: 'Сzech republic',
    city: 'Prague',
    code: 'PRG',
    image: '/image/praga.jpg',
    description: 'Prague is a political, cultural and economic centre of central Europe complete with a rich history. Founded during the Romanesque and flourishing by the Gothic, Renaissance and Baroque eras, Prague was the capital of the Kingdom of Bohemia and the main residence of several Holy Roman Emperors, most notably of Charles IV (r. 1346–1378). It was an important city to the Habsburg Monarchy and its Austro-Hungarian Empire. The city played major roles in the Bohemian and Protestant Reformation, the Thirty Years\' War and in 20th-century history as the capital of Czechoslovakia during both World Wars and the post-war Communist era.'

  },
  {
    name: 'China',
    city: 'Beijing',
    code: 'PEK',
    image: '/image/pekin.jpg',
    description: 'Beijing is the capital of the People\'s Republic of China, the world\'s third most populous city proper, and most populous capital city. The city, located in northern China, is governed as a municipality under the direct administration of central government with 16 urban, suburban, and rural districts.[13] Beijing Municipality is surrounded by Hebei Province with the exception of neighboring Tianjin Municipality to the southeast; together the three divisions form the Jingjinji metropolitan region and the national capital region of China.'
  },
  {
    name: 'Cuba',
    city: 'Havana',
    code: 'HAV',
    image: '/image/lahabana.jpg',
    description: 'Havana (/həˈvænə/; Spanish: La Habana [la aˈβana] (About this soundlisten)) is the capital city, largest city, province, major port, and leading commercial center of Cuba. The city has a population of 2.1 million inhabitants, and it spans a total of 781.58 km2 (301.77 sq mi) – making it the largest city by area, the most populous city, and the fourth largest metropolitan area in the Caribbean region.'
  },
  {
    name: 'Brazil',
    city: 'Rio de Janeiro',
    code: 'RIO',
    image: '/image/rio de janeiro.jpg',
    description: 'Rio de Janeiro or simply Rio, is anchor to the Rio de Janeiro metropolitan area and the second-most populous municipality in Brazil and the sixth-most populous in the Americas. Rio de Janeiro is the capital of the state of Rio de Janeiro, Brazil\'s third-most populous state. Part of the city has been designated as a World Heritage Site, named \"Rio de Janeiro: Carioca Landscapes between the Mountain and the Sea\", by UNESCO on 1 July 2012 as a Cultural Landscape.'
  },
  {
    name: 'Australia',
    city: 'Sydney',
    code: 'SYD',
    image: '/image/sydney.jpg',
    description: 'Sydney is the state capital of New South Wales and the most populous city in Australia and Oceania. Located on Australia\'s east coast, the metropolis surrounds Port Jackson and extends about 70 km (43.5 mi) on its periphery towards the Blue Mountains to the west, Hawkesbury to the north, the Royal National Park to the south and Macarthur to the south-west.[9] Sydney is made up of 658 suburbs, 40 local government areas and 15 contiguous regions. Residents of the city are known as "Sydneysiders". As of June 2017, Sydney\'s estimated metropolitan population was 5,230,330 and is home to approximately 65% of the state\'s population.'
  },
  {
    name: 'New Zealand',
    city: 'Queenstown',
    code: 'UEE',
    image: '/image/newzealand.jpg',
    description: 'Queenstown is a resort town in Otago in the south-west of New Zealand\'s South Island. It has an urban population of 15,850 (June 2018), making it the 27th-largest urban area in New Zealand. In 2016, Queenstown overtook Oamaru to become the second-largest urban area in Otago, behind Dunedin\.The town is built around an inlet called Queenstown Bay on Lake Wakatipu, a long, thin, Z-shaped lake formed by glacial processes, and has views of nearby mountains such as The Remarkables, Cecil Peak, Walter Peak and just above the town, Ben Lomond and Queenstown Hill.'
  },
  {
    name: 'Bali',
    city: 'Kuta',
    code: 'DPS',
    image: '/image/kuta.jpg',
    description: 'Kuta (formally Kuta Village or Kuta Town) is a tourist area, administratively a subdistrict/village , and at the same time is the Capital of Kuta District, Badung Regency, southern Bali, Indonesia. A former fishing village, it was one of the first towns on Bali to see substantial tourist development, and as a beach resort remains one of Indonesia\'s major tourist destinations. It is known internationally for its long sandy beach, varied accommodation, many restaurants and bars, and many renowned surfers who visit from Australia. It is located near Bali\'s Ngurah Rai Airport.'
  }
];

const addCountries = async () => {
  try {
    await Country.create(countries);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};
addCountries();
