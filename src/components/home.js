import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"
import Carousel from 'react-bootstrap/Carousel'
import Select, { components } from 'react-select';
import moment from "moment";
import cogoToast from 'cogo-toast';

import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { confirmAlert } from 'react-confirm-alert'; // Import


const options = [
 {
   value: "Bangued, Abra",
   label: "Bangued, Abra"
 },
 {
   value: "Boliney, Abra",
   label: "Boliney, Abra"
 },
 {
   value: "Bucay, Abra",
   label: "Bucay, Abra"
 },
 {
   value: "Bucloc, Abra",
   label: "Bucloc, Abra"
 },
 {
   value: "Daguioman, Abra",
   label: "Daguioman, Abra"
 },
 {
   value: "Danglas, Abra",
   label: "Danglas, Abra"
 },
 {
   value: "Dolores, Abra",
   label: "Dolores, Abra"
 },
 {
   value: "La Paz, Abra",
   label: "La Paz, Abra"
 },
 {
   value: "Lacub, Abra",
   label: "Lacub, Abra"
 },
 {
   value: "Lagangilang, Abra",
   label: "Lagangilang, Abra"
 },
 {
   value: "Lagayan, Abra",
   label: "Lagayan, Abra"
 },
 {
   value: "Langiden, Abra",
   label: "Langiden, Abra"
 },
 {
   value: "Licuan-Baay, Abra",
   label: "Licuan-Baay, Abra"
 },
 {
   value: "Luba, Abra",
   label: "Luba, Abra"
 },
 {
   value: "Malibcong, Abra",
   label: "Malibcong, Abra"
 },
 {
   value: "Manabo, Abra",
   label: "Manabo, Abra"
 },
 {
   value: "Peñarrubia, Abra",
   label: "Peñarrubia, Abra"
 },
 {
   value: "Pidigan, Abra",
   label: "Pidigan, Abra"
 },
 {
   value: "Pilar, Abra",
   label: "Pilar, Abra"
 },
 {
   value: "Sallapadan, Abra",
   label: "Sallapadan, Abra"
 },
 {
   value: "San Isidro, Abra",
   label: "San Isidro, Abra"
 },
 {
   value: "San Juan, Abra",
   label: "San Juan, Abra"
 },
 {
   value: "San Quintin, Abra",
   label: "San Quintin, Abra"
 },
 {
   value: "Tayum, Abra",
   label: "Tayum, Abra"
 },
 {
   value: "Tineg, Abra",
   label: "Tineg, Abra"
 },
 {
   value: "Tubo, Abra",
   label: "Tubo, Abra"
 },
 {
   value: "Villaviciosa, Abra",
   label: "Villaviciosa, Abra"
 },
 {
   value: "Butuan City, Agusan del Norte",
   label: "Butuan City, Agusan del Norte"
 },
 {
   value: "Buenavista, Agusan del Norte",
   label: "Buenavista, Agusan del Norte"
 },
 {
   value: "Cabadbaran, Agusan del Norte",
   label: "Cabadbaran, Agusan del Norte"
 },
 {
   value: "Carmen, Agusan del Norte",
   label: "Carmen, Agusan del Norte"
 },
 {
   value: "Jabonga, Agusan del Norte",
   label: "Jabonga, Agusan del Norte"
 },
 {
   value: "Kitcharao, Agusan del Norte",
   label: "Kitcharao, Agusan del Norte"
 },
 {
   value: "Las Nieves, Agusan del Norte",
   label: "Las Nieves, Agusan del Norte"
 },
 {
   value: "Magallanes, Agusan del Norte",
   label: "Magallanes, Agusan del Norte"
 },
 {
   value: "Nasipit, Agusan del Norte",
   label: "Nasipit, Agusan del Norte"
 },
 {
   value: "Remedios T. Romualdez, Agusan del Norte",
   label: "Remedios T. Romualdez, Agusan del Norte"
 },
 {
   value: "Santiago, Agusan del Norte",
   label: "Santiago, Agusan del Norte"
 },
 {
   value: "Tubay, Agusan del Norte",
   label: "Tubay, Agusan del Norte"
 },
 {
   value: "Bayugan, Agusan del Sur",
   label: "Bayugan, Agusan del Sur"
 },
 {
   value: "Bunawan, Agusan del Sur",
   label: "Bunawan, Agusan del Sur"
 },
 {
   value: "Esperanza, Agusan del Sur",
   label: "Esperanza, Agusan del Sur"
 },
 {
   value: "La Paz, Agusan del Sur",
   label: "La Paz, Agusan del Sur"
 },
 {
   value: "Loreto, Agusan del Sur",
   label: "Loreto, Agusan del Sur"
 },
 {
   value: "Prosperidad, Agusan del Sur",
   label: "Prosperidad, Agusan del Sur"
 },
 {
   value: "Rosario, Agusan del Sur",
   label: "Rosario, Agusan del Sur"
 },
 {
   value: "San Francisco, Agusan del Sur",
   label: "San Francisco, Agusan del Sur"
 },
 {
   value: "San Luis, Agusan del Sur",
   label: "San Luis, Agusan del Sur"
 },
 {
   value: "Santa Josefa, Agusan del Sur",
   label: "Santa Josefa, Agusan del Sur"
 },
 {
   value: "Sibagat, Agusan del Sur",
   label: "Sibagat, Agusan del Sur"
 },
 {
   value: "Talacogon, Agusan del Sur",
   label: "Talacogon, Agusan del Sur"
 },
 {
   value: "Trento, Agusan del Sur",
   label: "Trento, Agusan del Sur"
 },
 {
   value: "Veruela, Agusan del Sur",
   label: "Veruela, Agusan del Sur"
 },
 {
   value: "Altavas, Aklan",
   label: "Altavas, Aklan"
 },
 {
   value: "Balete, Aklan",
   label: "Balete, Aklan"
 },
 {
   value: "Banga, Aklan",
   label: "Banga, Aklan"
 },
 {
   value: "Batan, Aklan",
   label: "Batan, Aklan"
 },
 {
   value: "Buruanga, Aklan",
   label: "Buruanga, Aklan"
 },
 {
   value: "Ibajay, Aklan",
   label: "Ibajay, Aklan"
 },
 {
   value: "Kalibo, Aklan",
   label: "Kalibo, Aklan"
 },
 {
   value: "Lezo, Aklan",
   label: "Lezo, Aklan"
 },
 {
   value: "Libacao, Aklan",
   label: "Libacao, Aklan"
 },
 {
   value: "Madalag, Aklan",
   label: "Madalag, Aklan"
 },
 {
   value: "Makato, Aklan",
   label: "Makato, Aklan"
 },
 {
   value: "Malay, Aklan",
   label: "Malay, Aklan"
 },
 {
   value: "Malinao, Aklan",
   label: "Malinao, Aklan"
 },
 {
   value: "Nabas, Aklan",
   label: "Nabas, Aklan"
 },
 {
   value: "New Washington, Aklan",
   label: "New Washington, Aklan"
 },
 {
   value: "Numancia, Aklan",
   label: "Numancia, Aklan"
 },
 {
   value: "Tangalan, Aklan",
   label: "Tangalan, Aklan"
 },
 {
   value: "Legazpi City, Albay",
   label: "Legazpi City, Albay"
 },
 {
   value: "Ligao City, Albay",
   label: "Ligao City, Albay"
 },
 {
   value: "Tabaco City, Albay",
   label: "Tabaco City, Albay"
 },
 {
   value: "Bacacay, Albay",
   label: "Bacacay, Albay"
 },
 {
   value: "Camalig, Albay",
   label: "Camalig, Albay"
 },
 {
   value: "Daraga, Albay",
   label: "Daraga, Albay"
 },
 {
   value: "Guinobatan, Albay",
   label: "Guinobatan, Albay"
 },
 {
   value: "Jovellar, Albay",
   label: "Jovellar, Albay"
 },
 {
   value: "Libon, Albay",
   label: "Libon, Albay"
 },
 {
   value: "Malilipot, Albay",
   label: "Malilipot, Albay"
 },
 {
   value: "Malinao, Albay",
   label: "Malinao, Albay"
 },
 {
   value: "Manito, Albay",
   label: "Manito, Albay"
 },
 {
   value: "Oas, Albay",
   label: "Oas, Albay"
 },
 {
   value: "Pio Duran, Albay",
   label: "Pio Duran, Albay"
 },
 {
   value: "Polangui, Albay",
   label: "Polangui, Albay"
 },
 {
   value: "Rapu-Rapu, Albay",
   label: "Rapu-Rapu, Albay"
 },
 {
   value: "Santo Domingo, Albay",
   label: "Santo Domingo, Albay"
 },
 {
   value: "Tiwi, Albay",
   label: "Tiwi, Albay"
 },
 {
   value: "Anini-y, Antique",
   label: "Anini-y, Antique"
 },
 {
   value: "Barbaza, Antique",
   label: "Barbaza, Antique"
 },
 {
   value: "Belison, Antique",
   label: "Belison, Antique"
 },
 {
   value: "Bugasong, Antique",
   label: "Bugasong, Antique"
 },
 {
   value: "Caluya, Antique",
   label: "Caluya, Antique"
 },
 {
   value: "Culasi, Antique",
   label: "Culasi, Antique"
 },
 {
   value: "Hamtic, Antique",
   label: "Hamtic, Antique"
 },
 {
   value: "Laua-an, Antique",
   label: "Laua-an, Antique"
 },
 {
   value: "Libertad, Antique",
   label: "Libertad, Antique"
 },
 {
   value: "Pandan, Antique",
   label: "Pandan, Antique"
 },
 {
   value: "Patnongon, Antique",
   label: "Patnongon, Antique"
 },
 {
   value: "San Jose, Antique",
   label: "San Jose, Antique"
 },
 {
   value: "San Remigio, Antique",
   label: "San Remigio, Antique"
 },
 {
   value: "Sebaste, Antique",
   label: "Sebaste, Antique"
 },
 {
   value: "Sibalom, Antique",
   label: "Sibalom, Antique"
 },
 {
   value: "Tibiao, Antique",
   label: "Tibiao, Antique"
 },
 {
   value: "Tobias Fornier, Antique",
   label: "Tobias Fornier, Antique"
 },
 {
   value: "Valderrama, Antique",
   label: "Valderrama, Antique"
 },
 {
   value: "Calanasan, Apayao",
   label: "Calanasan, Apayao"
 },
 {
   value: "Conner, Apayao",
   label: "Conner, Apayao"
 },
 {
   value: "Flora, Apayao",
   label: "Flora, Apayao"
 },
 {
   value: "Kabugao, Apayao",
   label: "Kabugao, Apayao"
 },
 {
   value: "Luna, Apayao",
   label: "Luna, Apayao"
 },
 {
   value: "Pudtol, Apayao",
   label: "Pudtol, Apayao"
 },
 {
   value: "Santa Marcela, Apayao",
   label: "Santa Marcela, Apayao"
 },
 {
   value: "Baler, Aurora",
   label: "Baler, Aurora"
 },
 {
   value: "Casiguran, Aurora",
   label: "Casiguran, Aurora"
 },
 {
   value: "Dilasag, Aurora",
   label: "Dilasag, Aurora"
 },
 {
   value: "Dinalungan, Aurora",
   label: "Dinalungan, Aurora"
 },
 {
   value: "Dingalan, Aurora",
   label: "Dingalan, Aurora"
 },
 {
   value: "Dipaculao, Aurora",
   label: "Dipaculao, Aurora"
 },
 {
   value: "Maria Aurora, Aurora",
   label: "Maria Aurora, Aurora"
 },
 {
   value: "San Luis, Aurora",
   label: "San Luis, Aurora"
 },
 {
   value: "Isabela City, Basilan",
   label: "Isabela City, Basilan"
 },
 {
   value: "Akbar, Basilan",
   label: "Akbar, Basilan"
 },
 {
   value: "Al-Barka, Basilan",
   label: "Al-Barka, Basilan"
 },
 {
   value: "Hadji Mohammad Ajul, Basilan",
   label: "Hadji Mohammad Ajul, Basilan"
 },
 {
   value: "Hadji Muhtamad, Basilan",
   label: "Hadji Muhtamad, Basilan"
 },
 {
   value: "Lamitan, Basilan",
   label: "Lamitan, Basilan"
 },
 {
   value: "Lantawan, Basilan",
   label: "Lantawan, Basilan"
 },
 {
   value: "Maluso, Basilan",
   label: "Maluso, Basilan"
 },
 {
   value: "Sumisip, Basilan",
   label: "Sumisip, Basilan"
 },
 {
   value: "Tabuan-Lasa, Basilan",
   label: "Tabuan-Lasa, Basilan"
 },
 {
   value: "Tipo-Tipo, Basilan",
   label: "Tipo-Tipo, Basilan"
 },
 {
   value: "Tuburan, Basilan",
   label: "Tuburan, Basilan"
 },
 {
   value: "Ungkaya Pukan, Basilan",
   label: "Ungkaya Pukan, Basilan"
 },
 {
   value: "Balanga City, Bataan",
   label: "Balanga City, Bataan"
 },
 {
   value: "Abucay, Bataan",
   label: "Abucay, Bataan"
 },
 {
   value: "Bagac, Bataan",
   label: "Bagac, Bataan"
 },
 {
   value: "Dinalupihan, Bataan",
   label: "Dinalupihan, Bataan"
 },
 {
   value: "Hermosa, Bataan",
   label: "Hermosa, Bataan"
 },
 {
   value: "Limay, Bataan",
   label: "Limay, Bataan"
 },
 {
   value: "Mariveles, Bataan",
   label: "Mariveles, Bataan"
 },
 {
   value: "Morong, Bataan",
   label: "Morong, Bataan"
 },
 {
   value: "Orani, Bataan",
   label: "Orani, Bataan"
 },
 {
   value: "Orion, Bataan",
   label: "Orion, Bataan"
 },
 {
   value: "Pilar, Bataan",
   label: "Pilar, Bataan"
 },
 {
   value: "Samal, Bataan",
   label: "Samal, Bataan"
 },
 {
   value: "Basco, Batanes",
   label: "Basco, Batanes"
 },
 {
   value: "Itbayat, Batanes",
   label: "Itbayat, Batanes"
 },
 {
   value: "Ivana, Batanes",
   label: "Ivana, Batanes"
 },
 {
   value: "Mahatao, Batanes",
   label: "Mahatao, Batanes"
 },
 {
   value: "Sabtang, Batanes",
   label: "Sabtang, Batanes"
 },
 {
   value: "Uyugan, Batanes",
   label: "Uyugan, Batanes"
 },
 {
   value: "Batangas City, Batangas",
   label: "Batangas City, Batangas"
 },
 {
   value: "Lipa City, Batangas",
   label: "Lipa City, Batangas"
 },
 {
   value: "Tanauan City, Batangas",
   label: "Tanauan City, Batangas"
 },
 {
   value: "Agoncillo, Batangas",
   label: "Agoncillo, Batangas"
 },
 {
   value: "Alitagtag, Batangas",
   label: "Alitagtag, Batangas"
 },
 {
   value: "Balayan, Batangas",
   label: "Balayan, Batangas"
 },
 {
   value: "Balete, Batangas",
   label: "Balete, Batangas"
 },
 {
   value: "Bauan, Batangas",
   label: "Bauan, Batangas"
 },
 {
   value: "Calaca, Batangas",
   label: "Calaca, Batangas"
 },
 {
   value: "Calatagan, Batangas",
   label: "Calatagan, Batangas"
 },
 {
   value: "Cuenca, Batangas",
   label: "Cuenca, Batangas"
 },
 {
   value: "Ibaan, Batangas",
   label: "Ibaan, Batangas"
 },
 {
   value: "Laurel, Batangas",
   label: "Laurel, Batangas"
 },
 {
   value: "Lemery, Batangas",
   label: "Lemery, Batangas"
 },
 {
   value: "Lian, Batangas",
   label: "Lian, Batangas"
 },
 {
   value: "Lobo, Batangas",
   label: "Lobo, Batangas"
 },
 {
   value: "Mabini, Batangas",
   label: "Mabini, Batangas"
 },
 {
   value: "Malvar, Batangas",
   label: "Malvar, Batangas"
 },
 {
   value: "Mataas na Kahoy, Batangas",
   label: "Mataas na Kahoy, Batangas"
 },
 {
   value: "Nasugbu, Batangas",
   label: "Nasugbu, Batangas"
 },
 {
   value: "Padre Garcia, Batangas",
   label: "Padre Garcia, Batangas"
 },
 {
   value: "Rosario, Batangas",
   label: "Rosario, Batangas"
 },
 {
   value: "San Jose, Batangas",
   label: "San Jose, Batangas"
 },
 {
   value: "San Juan, Batangas",
   label: "San Juan, Batangas"
 },
 {
   value: "San Luis, Batangas",
   label: "San Luis, Batangas"
 },
 {
   value: "San Nicolas, Batangas",
   label: "San Nicolas, Batangas"
 },
 {
   value: "San Pascual, Batangas",
   label: "San Pascual, Batangas"
 },
 {
   value: "Santa Teresita, Batangas",
   label: "Santa Teresita, Batangas"
 },
 {
   value: "Santo Tomas, Batangas",
   label: "Santo Tomas, Batangas"
 },
 {
   value: "Taal, Batangas",
   label: "Taal, Batangas"
 },
 {
   value: "Talisay, Batangas",
   label: "Talisay, Batangas"
 },
 {
   value: "Taysan, Batangas",
   label: "Taysan, Batangas"
 },
 {
   value: "Tingloy, Batangas",
   label: "Tingloy, Batangas"
 },
 {
   value: "Tuy, Batangas",
   label: "Tuy, Batangas"
 },
 {
   value: "Baguio City, Benguet",
   label: "Baguio City, Benguet"
 },
 {
   value: "Atok, Benguet",
   label: "Atok, Benguet"
 },
 {
   value: "Bakun, Benguet",
   label: "Bakun, Benguet"
 },
 {
   value: "Bokod, Benguet",
   label: "Bokod, Benguet"
 },
 {
   value: "Buguias, Benguet",
   label: "Buguias, Benguet"
 },
 {
   value: "Itogon, Benguet",
   label: "Itogon, Benguet"
 },
 {
   value: "Kabayan, Benguet",
   label: "Kabayan, Benguet"
 },
 {
   value: "Kapangan, Benguet",
   label: "Kapangan, Benguet"
 },
 {
   value: "Kibungan, Benguet",
   label: "Kibungan, Benguet"
 },
 {
   value: "La Trinidad, Benguet",
   label: "La Trinidad, Benguet"
 },
 {
   value: "Mankayan, Benguet",
   label: "Mankayan, Benguet"
 },
 {
   value: "Sablan, Benguet",
   label: "Sablan, Benguet"
 },
 {
   value: "Tuba, Benguet",
   label: "Tuba, Benguet"
 },
 {
   value: "Tublay, Benguet",
   label: "Tublay, Benguet"
 },
 {
   value: "Almeria, Biliran",
   label: "Almeria, Biliran"
 },
 {
   value: "Biliran, Biliran",
   label: "Biliran, Biliran"
 },
 {
   value: "Cabucgayan, Biliran",
   label: "Cabucgayan, Biliran"
 },
 {
   value: "Caibiran, Biliran",
   label: "Caibiran, Biliran"
 },
 {
   value: "Culaba, Biliran",
   label: "Culaba, Biliran"
 },
 {
   value: "Kawayan, Biliran",
   label: "Kawayan, Biliran"
 },
 {
   value: "Maripipi, Biliran",
   label: "Maripipi, Biliran"
 },
 {
   value: "Naval, Biliran",
   label: "Naval, Biliran"
 },
 {
   value: "Tagbilaran City, Bohol",
   label: "Tagbilaran City, Bohol"
 },
 {
   value: "Alburquerque, Bohol",
   label: "Alburquerque, Bohol"
 },
 {
   value: "Alicia, Bohol",
   label: "Alicia, Bohol"
 },
 {
   value: "Anda, Bohol",
   label: "Anda, Bohol"
 },
 {
   value: "Antequera, Bohol",
   label: "Antequera, Bohol"
 },
 {
   value: "Baclayon, Bohol",
   label: "Baclayon, Bohol"
 },
 {
   value: "Balilihan, Bohol",
   label: "Balilihan, Bohol"
 },
 {
   value: "Batuan, Bohol",
   label: "Batuan, Bohol"
 },
 {
   value: "Bien Unido, Bohol",
   label: "Bien Unido, Bohol"
 },
 {
   value: "Bilar, Bohol",
   label: "Bilar, Bohol"
 },
 {
   value: "Buenavista, Bohol",
   label: "Buenavista, Bohol"
 },
 {
   value: "Calape, Bohol",
   label: "Calape, Bohol"
 },
 {
   value: "Candijay, Bohol",
   label: "Candijay, Bohol"
 },
 {
   value: "Carmen, Bohol",
   label: "Carmen, Bohol"
 },
 {
   value: "Catigbian, Bohol",
   label: "Catigbian, Bohol"
 },
 {
   value: "Clarin, Bohol",
   label: "Clarin, Bohol"
 },
 {
   value: "Corella, Bohol",
   label: "Corella, Bohol"
 },
 {
   value: "Cortes, Bohol",
   label: "Cortes, Bohol"
 },
 {
   value: "Dagohoy, Bohol",
   label: "Dagohoy, Bohol"
 },
 {
   value: "Danao, Bohol",
   label: "Danao, Bohol"
 },
 {
   value: "Dauis, Bohol",
   label: "Dauis, Bohol"
 },
 {
   value: "Dimiao, Bohol",
   label: "Dimiao, Bohol"
 },
 {
   value: "Duero, Bohol",
   label: "Duero, Bohol"
 },
 {
   value: "Garcia Hernandez, Bohol",
   label: "Garcia Hernandez, Bohol"
 },
 {
   value: "Getafe, Bohol",
   label: "Getafe, Bohol"
 },
 {
   value: "Guindulman, Bohol",
   label: "Guindulman, Bohol"
 },
 {
   value: "Inabanga, Bohol",
   label: "Inabanga, Bohol"
 },
 {
   value: "Jagna, Bohol",
   label: "Jagna, Bohol"
 },
 {
   value: "Lila, Bohol",
   label: "Lila, Bohol"
 },
 {
   value: "Loay, Bohol",
   label: "Loay, Bohol"
 },
 {
   value: "Loboc, Bohol",
   label: "Loboc, Bohol"
 },
 {
   value: "Loon, Bohol",
   label: "Loon, Bohol"
 },
 {
   value: "Mabini, Bohol",
   label: "Mabini, Bohol"
 },
 {
   value: "Maribojoc, Bohol",
   label: "Maribojoc, Bohol"
 },
 {
   value: "Panglao, Bohol",
   label: "Panglao, Bohol"
 },
 {
   value: "Pilar, Bohol",
   label: "Pilar, Bohol"
 },
 {
   value: "President Carlos P. Garcia, Bohol",
   label: "President Carlos P. Garcia, Bohol"
 },
 {
   value: "Sagbayan, Bohol",
   label: "Sagbayan, Bohol"
 },
 {
   value: "San Isidro, Bohol",
   label: "San Isidro, Bohol"
 },
 {
   value: "San Miguel, Bohol",
   label: "San Miguel, Bohol"
 },
 {
   value: "Sevilla, Bohol",
   label: "Sevilla, Bohol"
 },
 {
   value: "Sierra Bullones, Bohol",
   label: "Sierra Bullones, Bohol"
 },
 {
   value: "Sikatuna, Bohol",
   label: "Sikatuna, Bohol"
 },
 {
   value: "Talibon, Bohol",
   label: "Talibon, Bohol"
 },
 {
   value: "Trinidad, Bohol",
   label: "Trinidad, Bohol"
 },
 {
   value: "Tubigon, Bohol",
   label: "Tubigon, Bohol"
 },
 {
   value: "Ubay, Bohol",
   label: "Ubay, Bohol"
 },
 {
   value: "Valencia, Bohol",
   label: "Valencia, Bohol"
 },
 {
   value: "Malaybalay City, Bukidnon",
   label: "Malaybalay City, Bukidnon"
 },
 {
   value: "Valencia City, Bukidnon",
   label: "Valencia City, Bukidnon"
 },
 {
   value: "Baungon, Bukidnon",
   label: "Baungon, Bukidnon"
 },
 {
   value: "Cabanglasan, Bukidnon",
   label: "Cabanglasan, Bukidnon"
 },
 {
   value: "Damulog, Bukidnon",
   label: "Damulog, Bukidnon"
 },
 {
   value: "Dangcagan, Bukidnon",
   label: "Dangcagan, Bukidnon"
 },
 {
   value: "Don Carlos, Bukidnon",
   label: "Don Carlos, Bukidnon"
 },
 {
   value: "Impasug-ong, Bukidnon",
   label: "Impasug-ong, Bukidnon"
 },
 {
   value: "Kadingilan, Bukidnon",
   label: "Kadingilan, Bukidnon"
 },
 {
   value: "Kalilangan, Bukidnon",
   label: "Kalilangan, Bukidnon"
 },
 {
   value: "Kibawe, Bukidnon",
   label: "Kibawe, Bukidnon"
 },
 {
   value: "Kitaotao, Bukidnon",
   label: "Kitaotao, Bukidnon"
 },
 {
   value: "Lantapan, Bukidnon",
   label: "Lantapan, Bukidnon"
 },
 {
   value: "Libona, Bukidnon",
   label: "Libona, Bukidnon"
 },
 {
   value: "Malitbog, Bukidnon",
   label: "Malitbog, Bukidnon"
 },
 {
   value: "Manolo Fortich, Bukidnon",
   label: "Manolo Fortich, Bukidnon"
 },
 {
   value: "Maramag, Bukidnon",
   label: "Maramag, Bukidnon"
 },
 {
   value: "Pangantucan, Bukidnon",
   label: "Pangantucan, Bukidnon"
 },
 {
   value: "Quezon, Bukidnon",
   label: "Quezon, Bukidnon"
 },
 {
   value: "San Fernando, Bukidnon",
   label: "San Fernando, Bukidnon"
 },
 {
   value: "Sumilao, Bukidnon",
   label: "Sumilao, Bukidnon"
 },
 {
   value: "Talakag, Bukidnon",
   label: "Talakag, Bukidnon"
 },
 {
   value: "Malolos City, Bulacan",
   label: "Malolos City, Bulacan"
 },
 {
   value: "Meycauayan City, Bulacan",
   label: "Meycauayan City, Bulacan"
 },
 {
   value: "San Jose del Monte City, Bulacan",
   label: "San Jose del Monte City, Bulacan"
 },
 {
   value: "Angat, Bulacan",
   label: "Angat, Bulacan"
 },
 {
   value: "Balagtas, Bulacan",
   label: "Balagtas, Bulacan"
 },
 {
   value: "Baliuag, Bulacan",
   label: "Baliuag, Bulacan"
 },
 {
   value: "Bocaue, Bulacan",
   label: "Bocaue, Bulacan"
 },
 {
   value: "Bulacan, Bulacan",
   label: "Bulacan, Bulacan"
 },
 {
   value: "Bustos, Bulacan",
   label: "Bustos, Bulacan"
 },
 {
   value: "Calumpit, Bulacan",
   label: "Calumpit, Bulacan"
 },
 {
   value: "Doña Remedios Trinidad, Bulacan",
   label: "Doña Remedios Trinidad, Bulacan"
 },
 {
   value: "Guiguinto, Bulacan",
   label: "Guiguinto, Bulacan"
 },
 {
   value: "Hagonoy, Bulacan",
   label: "Hagonoy, Bulacan"
 },
 {
   value: "Marilao, Bulacan",
   label: "Marilao, Bulacan"
 },
 {
   value: "Norzagaray, Bulacan",
   label: "Norzagaray, Bulacan"
 },
 {
   value: "Obando, Bulacan",
   label: "Obando, Bulacan"
 },
 {
   value: "Pandi, Bulacan",
   label: "Pandi, Bulacan"
 },
 {
   value: "Paombong, Bulacan",
   label: "Paombong, Bulacan"
 },
 {
   value: "Plaridel, Bulacan",
   label: "Plaridel, Bulacan"
 },
 {
   value: "Pulilan, Bulacan",
   label: "Pulilan, Bulacan"
 },
 {
   value: "San Ildefonso, Bulacan",
   label: "San Ildefonso, Bulacan"
 },
 {
   value: "San Miguel, Bulacan",
   label: "San Miguel, Bulacan"
 },
 {
   value: "San Rafael, Bulacan",
   label: "San Rafael, Bulacan"
 },
 {
   value: "Santa Maria, Bulacan",
   label: "Santa Maria, Bulacan"
 },
 {
   value: "Tuguegarao City, Cagayan",
   label: "Tuguegarao City, Cagayan"
 },
 {
   value: "Abulug, Cagayan",
   label: "Abulug, Cagayan"
 },
 {
   value: "Alcala, Cagayan",
   label: "Alcala, Cagayan"
 },
 {
   value: "Allacapan, Cagayan",
   label: "Allacapan, Cagayan"
 },
 {
   value: "Amulung, Cagayan",
   label: "Amulung, Cagayan"
 },
 {
   value: "Aparri, Cagayan",
   label: "Aparri, Cagayan"
 },
 {
   value: "Baggao, Cagayan",
   label: "Baggao, Cagayan"
 },
 {
   value: "Ballesteros, Cagayan",
   label: "Ballesteros, Cagayan"
 },
 {
   value: "Buguey, Cagayan",
   label: "Buguey, Cagayan"
 },
 {
   value: "Calayan, Cagayan",
   label: "Calayan, Cagayan"
 },
 {
   value: "Camalaniugan, Cagayan",
   label: "Camalaniugan, Cagayan"
 },
 {
   value: "Claveria, Cagayan",
   label: "Claveria, Cagayan"
 },
 {
   value: "Enrile, Cagayan",
   label: "Enrile, Cagayan"
 },
 {
   value: "Gattaran, Cagayan",
   label: "Gattaran, Cagayan"
 },
 {
   value: "Gonzaga, Cagayan",
   label: "Gonzaga, Cagayan"
 },
 {
   value: "Iguig, Cagayan",
   label: "Iguig, Cagayan"
 },
 {
   value: "Lal-lo, Cagayan",
   label: "Lal-lo, Cagayan"
 },
 {
   value: "Lasam, Cagayan",
   label: "Lasam, Cagayan"
 },
 {
   value: "Pamplona, Cagayan",
   label: "Pamplona, Cagayan"
 },
 {
   value: "Peñablanca, Cagayan",
   label: "Peñablanca, Cagayan"
 },
 {
   value: "Piat, Cagayan",
   label: "Piat, Cagayan"
 },
 {
   value: "Rizal, Cagayan",
   label: "Rizal, Cagayan"
 },
 {
   value: "Sanchez-Mira, Cagayan",
   label: "Sanchez-Mira, Cagayan"
 },
 {
   value: "Santa Ana, Cagayan",
   label: "Santa Ana, Cagayan"
 },
 {
   value: "Santa Praxedes, Cagayan",
   label: "Santa Praxedes, Cagayan"
 },
 {
   value: "Santa Teresita, Cagayan",
   label: "Santa Teresita, Cagayan"
 },
 {
   value: "Santo Niño, Cagayan",
   label: "Santo Niño, Cagayan"
 },
 {
   value: "Solana, Cagayan",
   label: "Solana, Cagayan"
 },
 {
   value: "Tuao, Cagayan",
   label: "Tuao, Cagayan"
 },
 {
   value: "Basud, Camarines Norte",
   label: "Basud, Camarines Norte"
 },
 {
   value: "Capalonga, Camarines Norte",
   label: "Capalonga, Camarines Norte"
 },
 {
   value: "Daet, Camarines Norte",
   label: "Daet, Camarines Norte"
 },
 {
   value: "Jose Panganiban, Camarines Norte",
   label: "Jose Panganiban, Camarines Norte"
 },
 {
   value: "Labo, Camarines Norte",
   label: "Labo, Camarines Norte"
 },
 {
   value: "Mercedes, Camarines Norte",
   label: "Mercedes, Camarines Norte"
 },
 {
   value: "Paracale, Camarines Norte",
   label: "Paracale, Camarines Norte"
 },
 {
   value: "San Lorenzo Ruiz, Camarines Norte",
   label: "San Lorenzo Ruiz, Camarines Norte"
 },
 {
   value: "San Vicente, Camarines Norte",
   label: "San Vicente, Camarines Norte"
 },
 {
   value: "Santa Elena, Camarines Norte",
   label: "Santa Elena, Camarines Norte"
 },
 {
   value: "Talisay, Camarines Norte",
   label: "Talisay, Camarines Norte"
 },
 {
   value: "Vinzons, Camarines Norte",
   label: "Vinzons, Camarines Norte"
 },
 {
   value: "Iriga City, Camarines Sur",
   label: "Iriga City, Camarines Sur"
 },
 {
   value: "Naga City, Camarines Sur",
   label: "Naga City, Camarines Sur"
 },
 {
   value: "Baao, Camarines Sur",
   label: "Baao, Camarines Sur"
 },
 {
   value: "Balatan, Camarines Sur",
   label: "Balatan, Camarines Sur"
 },
 {
   value: "Bato, Camarines Sur",
   label: "Bato, Camarines Sur"
 },
 {
   value: "Bombon, Camarines Sur",
   label: "Bombon, Camarines Sur"
 },
 {
   value: "Buhi, Camarines Sur",
   label: "Buhi, Camarines Sur"
 },
 {
   value: "Bula, Camarines Sur",
   label: "Bula, Camarines Sur"
 },
 {
   value: "Cabusao, Camarines Sur",
   label: "Cabusao, Camarines Sur"
 },
 {
   value: "Calabanga, Camarines Sur",
   label: "Calabanga, Camarines Sur"
 },
 {
   value: "Camaligan, Camarines Sur",
   label: "Camaligan, Camarines Sur"
 },
 {
   value: "Canaman, Camarines Sur",
   label: "Canaman, Camarines Sur"
 },
 {
   value: "Caramoan, Camarines Sur",
   label: "Caramoan, Camarines Sur"
 },
 {
   value: "Del Gallego, Camarines Sur",
   label: "Del Gallego, Camarines Sur"
 },
 {
   value: "Gainza, Camarines Sur",
   label: "Gainza, Camarines Sur"
 },
 {
   value: "Garchitorena, Camarines Sur",
   label: "Garchitorena, Camarines Sur"
 },
 {
   value: "Goa, Camarines Sur",
   label: "Goa, Camarines Sur"
 },
 {
   value: "Lagonoy, Camarines Sur",
   label: "Lagonoy, Camarines Sur"
 },
 {
   value: "Libmanan, Camarines Sur",
   label: "Libmanan, Camarines Sur"
 },
 {
   value: "Lupi, Camarines Sur",
   label: "Lupi, Camarines Sur"
 },
 {
   value: "Magarao, Camarines Sur",
   label: "Magarao, Camarines Sur"
 },
 {
   value: "Milaor, Camarines Sur",
   label: "Milaor, Camarines Sur"
 },
 {
   value: "Minalabac, Camarines Sur",
   label: "Minalabac, Camarines Sur"
 },
 {
   value: "Nabua, Camarines Sur",
   label: "Nabua, Camarines Sur"
 },
 {
   value: "Ocampo, Camarines Sur",
   label: "Ocampo, Camarines Sur"
 },
 {
   value: "Pamplona, Camarines Sur",
   label: "Pamplona, Camarines Sur"
 },
 {
   value: "Pasacao, Camarines Sur",
   label: "Pasacao, Camarines Sur"
 },
 {
   value: "Pili, Camarines Sur",
   label: "Pili, Camarines Sur"
 },
 {
   value: "Presentacion, Camarines Sur",
   label: "Presentacion, Camarines Sur"
 },
 {
   value: "Ragay, Camarines Sur",
   label: "Ragay, Camarines Sur"
 },
 {
   value: "Sagñay, Camarines Sur",
   label: "Sagñay, Camarines Sur"
 },
 {
   value: "San Fernando, Camarines Sur",
   label: "San Fernando, Camarines Sur"
 },
 {
   value: "San Jose, Camarines Sur",
   label: "San Jose, Camarines Sur"
 },
 {
   value: "Sipocot, Camarines Sur",
   label: "Sipocot, Camarines Sur"
 },
 {
   value: "Siruma, Camarines Sur",
   label: "Siruma, Camarines Sur"
 },
 {
   value: "Tigaon, Camarines Sur",
   label: "Tigaon, Camarines Sur"
 },
 {
   value: "Tinambac, Camarines Sur",
   label: "Tinambac, Camarines Sur"
 },
 {
   value: "Catarman, Camiguin",
   label: "Catarman, Camiguin"
 },
 {
   value: "Guinsiliban, Camiguin",
   label: "Guinsiliban, Camiguin"
 },
 {
   value: "Mahinog, Camiguin",
   label: "Mahinog, Camiguin"
 },
 {
   value: "Mambajao, Camiguin",
   label: "Mambajao, Camiguin"
 },
 {
   value: "Sagay, Camiguin",
   label: "Sagay, Camiguin"
 },
 {
   value: "Roxas City, Capiz",
   label: "Roxas City, Capiz"
 },
 {
   value: "Cuartero, Capiz",
   label: "Cuartero, Capiz"
 },
 {
   value: "Dao, Capiz",
   label: "Dao, Capiz"
 },
 {
   value: "Dumalag, Capiz",
   label: "Dumalag, Capiz"
 },
 {
   value: "Dumarao, Capiz",
   label: "Dumarao, Capiz"
 },
 {
   value: "Ivisan, Capiz",
   label: "Ivisan, Capiz"
 },
 {
   value: "Jamindan, Capiz",
   label: "Jamindan, Capiz"
 },
 {
   value: "Ma-ayon, Capiz",
   label: "Ma-ayon, Capiz"
 },
 {
   value: "Mambusao, Capiz",
   label: "Mambusao, Capiz"
 },
 {
   value: "Panay, Capiz",
   label: "Panay, Capiz"
 },
 {
   value: "Panitan, Capiz",
   label: "Panitan, Capiz"
 },
 {
   value: "Pilar, Capiz",
   label: "Pilar, Capiz"
 },
 {
   value: "Pontevedra, Capiz",
   label: "Pontevedra, Capiz"
 },
 {
   value: "President Roxas, Capiz",
   label: "President Roxas, Capiz"
 },
 {
   value: "Sapi-an, Capiz",
   label: "Sapi-an, Capiz"
 },
 {
   value: "Sigma, Capiz",
   label: "Sigma, Capiz"
 },
 {
   value: "Tapaz, Capiz",
   label: "Tapaz, Capiz"
 },
 {
   value: "Bagamanoc, Catanduanes",
   label: "Bagamanoc, Catanduanes"
 },
 {
   value: "Baras, Catanduanes",
   label: "Baras, Catanduanes"
 },
 {
   value: "Bato, Catanduanes",
   label: "Bato, Catanduanes"
 },
 {
   value: "Caramoran, Catanduanes",
   label: "Caramoran, Catanduanes"
 },
 {
   value: "Gigmoto, Catanduanes",
   label: "Gigmoto, Catanduanes"
 },
 {
   value: "Pandan, Catanduanes",
   label: "Pandan, Catanduanes"
 },
 {
   value: "Panganiban, Catanduanes",
   label: "Panganiban, Catanduanes"
 },
 {
   value: "San Andres, Catanduanes",
   label: "San Andres, Catanduanes"
 },
 {
   value: "San Miguel, Catanduanes",
   label: "San Miguel, Catanduanes"
 },
 {
   value: "Viga, Catanduanes",
   label: "Viga, Catanduanes"
 },
 {
   value: "Virac, Catanduanes",
   label: "Virac, Catanduanes"
 },
 {
   value: "Cavite City, Cavite",
   label: "Cavite City, Cavite"
 },
 {
   value: "Dasmariñas City, Cavite",
   label: "Dasmariñas City, Cavite"
 },
 {
   value: "Tagaytay City, Cavite",
   label: "Tagaytay City, Cavite"
 },
 {
   value: "Trece Martires City, Cavite",
   label: "Trece Martires City, Cavite"
 },
 {
   value: "Alfonso, Cavite",
   label: "Alfonso, Cavite"
 },
 {
   value: "Amadeo, Cavite",
   label: "Amadeo, Cavite"
 },
 {
   value: "Bacoor, Cavite",
   label: "Bacoor, Cavite"
 },
 {
   value: "Carmona, Cavite",
   label: "Carmona, Cavite"
 },
 {
   value: "General Mariano Alvarez, Cavite",
   label: "General Mariano Alvarez, Cavite"
 },
 {
   value: "General Emilio Aguinaldo, Cavite",
   label: "General Emilio Aguinaldo, Cavite"
 },
 {
   value: "General Trias, Cavite",
   label: "General Trias, Cavite"
 },
 {
   value: "Imus, Cavite",
   label: "Imus, Cavite"
 },
 {
   value: "Indang, Cavite",
   label: "Indang, Cavite"
 },
 {
   value: "Kawit, Cavite",
   label: "Kawit, Cavite"
 },
 {
   value: "Magallanes, Cavite",
   label: "Magallanes, Cavite"
 },
 {
   value: "Maragondon, Cavite",
   label: "Maragondon, Cavite"
 },
 {
   value: "Mendez, Cavite",
   label: "Mendez, Cavite"
 },
 {
   value: "Naic, Cavite",
   label: "Naic, Cavite"
 },
 {
   value: "Noveleta, Cavite",
   label: "Noveleta, Cavite"
 },
 {
   value: "Rosario, Cavite",
   label: "Rosario, Cavite"
 },
 {
   value: "Silang, Cavite",
   label: "Silang, Cavite"
 },
 {
   value: "Tanza, Cavite",
   label: "Tanza, Cavite"
 },
 {
   value: "Ternate, Cavite",
   label: "Ternate, Cavite"
 },
 {
   value: "Bogo City, Cebu",
   label: "Bogo City, Cebu"
 },
 {
   value: "Cebu City, Cebu",
   label: "Cebu City, Cebu"
 },
 {
   value: "Carcar City, Cebu",
   label: "Carcar City, Cebu"
 },
 {
   value: "Danao City, Cebu",
   label: "Danao City, Cebu"
 },
 {
   value: "Lapu-Lapu City, Cebu",
   label: "Lapu-Lapu City, Cebu"
 },
 {
   value: "Mandaue City, Cebu",
   label: "Mandaue City, Cebu"
 },
 {
   value: "Naga City, Cebu",
   label: "Naga City, Cebu"
 },
 {
   value: "Talisay City, Cebu",
   label: "Talisay City, Cebu"
 },
 {
   value: "Toledo City, Cebu",
   label: "Toledo City, Cebu"
 },
 {
   value: "Alcantara, Cebu",
   label: "Alcantara, Cebu"
 },
 {
   value: "Alcoy, Cebu",
   label: "Alcoy, Cebu"
 },
 {
   value: "Alegria, Cebu",
   label: "Alegria, Cebu"
 },
 {
   value: "Aloguinsan, Cebu",
   label: "Aloguinsan, Cebu"
 },
 {
   value: "Argao, Cebu",
   label: "Argao, Cebu"
 },
 {
   value: "Asturias, Cebu",
   label: "Asturias, Cebu"
 },
 {
   value: "Badian, Cebu",
   label: "Badian, Cebu"
 },
 {
   value: "Balamban, Cebu",
   label: "Balamban, Cebu"
 },
 {
   value: "Bantayan, Cebu",
   label: "Bantayan, Cebu"
 },
 {
   value: "Barili, Cebu",
   label: "Barili, Cebu"
 },
 {
   value: "Boljoon, Cebu",
   label: "Boljoon, Cebu"
 },
 {
   value: "Borbon, Cebu",
   label: "Borbon, Cebu"
 },
 {
   value: "Carmen, Cebu",
   label: "Carmen, Cebu"
 },
 {
   value: "Catmon, Cebu",
   label: "Catmon, Cebu"
 },
 {
   value: "Compostela, Cebu",
   label: "Compostela, Cebu"
 },
 {
   value: "Consolacion, Cebu",
   label: "Consolacion, Cebu"
 },
 {
   value: "Cordoba, Cebu",
   label: "Cordoba, Cebu"
 },
 {
   value: "Daanbantayan, Cebu",
   label: "Daanbantayan, Cebu"
 },
 {
   value: "Dalaguete, Cebu",
   label: "Dalaguete, Cebu"
 },
 {
   value: "Dumanjug, Cebu",
   label: "Dumanjug, Cebu"
 },
 {
   value: "Ginatilan, Cebu",
   label: "Ginatilan, Cebu"
 },
 {
   value: "Liloan, Cebu",
   label: "Liloan, Cebu"
 },
 {
   value: "Madridejos, Cebu",
   label: "Madridejos, Cebu"
 },
 {
   value: "Malabuyoc, Cebu",
   label: "Malabuyoc, Cebu"
 },
 {
   value: "Medellin, Cebu",
   label: "Medellin, Cebu"
 },
 {
   value: "Minglanilla, Cebu",
   label: "Minglanilla, Cebu"
 },
 {
   value: "Moalboal, Cebu",
   label: "Moalboal, Cebu"
 },
 {
   value: "Oslob, Cebu",
   label: "Oslob, Cebu"
 },
 {
   value: "Pilar, Cebu",
   label: "Pilar, Cebu"
 },
 {
   value: "Pinamungahan, Cebu",
   label: "Pinamungahan, Cebu"
 },
 {
   value: "Poro, Cebu",
   label: "Poro, Cebu"
 },
 {
   value: "Ronda, Cebu",
   label: "Ronda, Cebu"
 },
 {
   value: "Samboan, Cebu",
   label: "Samboan, Cebu"
 },
 {
   value: "San Fernando, Cebu",
   label: "San Fernando, Cebu"
 },
 {
   value: "San Francisco, Cebu",
   label: "San Francisco, Cebu"
 },
 {
   value: "San Remigio, Cebu",
   label: "San Remigio, Cebu"
 },
 {
   value: "Santa Fe, Cebu",
   label: "Santa Fe, Cebu"
 },
 {
   value: "Santander, Cebu",
   label: "Santander, Cebu"
 },
 {
   value: "Sibonga, Cebu",
   label: "Sibonga, Cebu"
 },
 {
   value: "Sogod, Cebu",
   label: "Sogod, Cebu"
 },
 {
   value: "Tabogon, Cebu",
   label: "Tabogon, Cebu"
 },
 {
   value: "Tabuelan, Cebu",
   label: "Tabuelan, Cebu"
 },
 {
   value: "Tuburan, Cebu",
   label: "Tuburan, Cebu"
 },
 {
   value: "Tudela, Cebu",
   label: "Tudela, Cebu"
 },
 {
   value: "Compostela, Compostela Valley",
   label: "Compostela, Compostela Valley"
 },
 {
   value: "Laak, Compostela Valley",
   label: "Laak, Compostela Valley"
 },
 {
   value: "Mabini, Compostela Valley",
   label: "Mabini, Compostela Valley"
 },
 {
   value: "Maco, Compostela Valley",
   label: "Maco, Compostela Valley"
 },
 {
   value: "Maragusan, Compostela Valley",
   label: "Maragusan, Compostela Valley"
 },
 {
   value: "Mawab, Compostela Valley",
   label: "Mawab, Compostela Valley"
 },
 {
   value: "Monkayo, Compostela Valley",
   label: "Monkayo, Compostela Valley"
 },
 {
   value: "Montevista, Compostela Valley",
   label: "Montevista, Compostela Valley"
 },
 {
   value: "Nabunturan, Compostela Valley",
   label: "Nabunturan, Compostela Valley"
 },
 {
   value: "New Bataan, Compostela Valley",
   label: "New Bataan, Compostela Valley"
 },
 {
   value: "Pantukan, Compostela Valley",
   label: "Pantukan, Compostela Valley"
 },
 {
   value: "Kidapawan City, Cotabato",
   label: "Kidapawan City, Cotabato"
 },
 {
   value: "Alamada, Cotabato",
   label: "Alamada, Cotabato"
 },
 {
   value: "Aleosan, Cotabato",
   label: "Aleosan, Cotabato"
 },
 {
   value: "Antipas, Cotabato",
   label: "Antipas, Cotabato"
 },
 {
   value: "Arakan, Cotabato",
   label: "Arakan, Cotabato"
 },
 {
   value: "Banisilan, Cotabato",
   label: "Banisilan, Cotabato"
 },
 {
   value: "Carmen, Cotabato",
   label: "Carmen, Cotabato"
 },
 {
   value: "Kabacan, Cotabato",
   label: "Kabacan, Cotabato"
 },
 {
   value: "Libungan, Cotabato",
   label: "Libungan, Cotabato"
 },
 {
   value: "M'lang, Cotabato",
   label: "M'lang, Cotabato"
 },
 {
   value: "Magpet, Cotabato",
   label: "Magpet, Cotabato"
 },
 {
   value: "Makilala, Cotabato",
   label: "Makilala, Cotabato"
 },
 {
   value: "Matalam, Cotabato",
   label: "Matalam, Cotabato"
 },
 {
   value: "Midsayap, Cotabato",
   label: "Midsayap, Cotabato"
 },
 {
   value: "Pigkawayan, Cotabato",
   label: "Pigkawayan, Cotabato"
 },
 {
   value: "Pikit, Cotabato",
   label: "Pikit, Cotabato"
 },
 {
   value: "President Roxas, Cotabato",
   label: "President Roxas, Cotabato"
 },
 {
   value: "Tulunan, Cotabato",
   label: "Tulunan, Cotabato"
 },
 {
   value: "Panabo City, Davao del Norte",
   label: "Panabo City, Davao del Norte"
 },
 {
   value: "Island Garden City of Samal, Davao del Norte",
   label: "Island Garden City of Samal, Davao del Norte"
 },
 {
   value: "Tagum City, Davao del Norte",
   label: "Tagum City, Davao del Norte"
 },
 {
   value: "Asuncion, Davao del Norte",
   label: "Asuncion, Davao del Norte"
 },
 {
   value: "Braulio E. Dujali, Davao del Norte",
   label: "Braulio E. Dujali, Davao del Norte"
 },
 {
   value: "Carmen, Davao del Norte",
   label: "Carmen, Davao del Norte"
 },
 {
   value: "Kapalong, Davao del Norte",
   label: "Kapalong, Davao del Norte"
 },
 {
   value: "New Corella, Davao del Norte",
   label: "New Corella, Davao del Norte"
 },
 {
   value: "San Isidro, Davao del Norte",
   label: "San Isidro, Davao del Norte"
 },
 {
   value: "Santo Tomas, Davao del Norte",
   label: "Santo Tomas, Davao del Norte"
 },
 {
   value: "Talaingod, Davao del Norte",
   label: "Talaingod, Davao del Norte"
 },
 {
   value: "Davao City, Davao del Sur",
   label: "Davao City, Davao del Sur"
 },
 {
   value: "Digos City, Davao del Sur",
   label: "Digos City, Davao del Sur"
 },
 {
   value: "Bansalan, Davao del Sur",
   label: "Bansalan, Davao del Sur"
 },
 {
   value: "Don Marcelino, Davao del Sur",
   label: "Don Marcelino, Davao del Sur"
 },
 {
   value: "Hagonoy, Davao del Sur",
   label: "Hagonoy, Davao del Sur"
 },
 {
   value: "Jose Abad Santos, Davao del Sur",
   label: "Jose Abad Santos, Davao del Sur"
 },
 {
   value: "Kiblawan, Davao del Sur",
   label: "Kiblawan, Davao del Sur"
 },
 {
   value: "Magsaysay, Davao del Sur",
   label: "Magsaysay, Davao del Sur"
 },
 {
   value: "Malalag, Davao del Sur",
   label: "Malalag, Davao del Sur"
 },
 {
   value: "Malita, Davao del Sur",
   label: "Malita, Davao del Sur"
 },
 {
   value: "Matanao, Davao del Sur",
   label: "Matanao, Davao del Sur"
 },
 {
   value: "Padada, Davao del Sur",
   label: "Padada, Davao del Sur"
 },
 {
   value: "Santa Cruz, Davao del Sur",
   label: "Santa Cruz, Davao del Sur"
 },
 {
   value: "Santa Maria, Davao del Sur",
   label: "Santa Maria, Davao del Sur"
 },
 {
   value: "Sarangani, Davao del Sur",
   label: "Sarangani, Davao del Sur"
 },
 {
   value: "Sulop, Davao del Sur",
   label: "Sulop, Davao del Sur"
 },
 {
   value: "Mati City, Davao Oriental",
   label: "Mati City, Davao Oriental"
 },
 {
   value: "Baganga, Davao Oriental",
   label: "Baganga, Davao Oriental"
 },
 {
   value: "Banaybanay, Davao Oriental",
   label: "Banaybanay, Davao Oriental"
 },
 {
   value: "Boston, Davao Oriental",
   label: "Boston, Davao Oriental"
 },
 {
   value: "Caraga, Davao Oriental",
   label: "Caraga, Davao Oriental"
 },
 {
   value: "Cateel, Davao Oriental",
   label: "Cateel, Davao Oriental"
 },
 {
   value: "Governor Generoso, Davao Oriental",
   label: "Governor Generoso, Davao Oriental"
 },
 {
   value: "Lupon, Davao Oriental",
   label: "Lupon, Davao Oriental"
 },
 {
   value: "Manay, Davao Oriental",
   label: "Manay, Davao Oriental"
 },
 {
   value: "San Isidro, Davao Oriental",
   label: "San Isidro, Davao Oriental"
 },
 {
   value: "Tarragona, Davao Oriental",
   label: "Tarragona, Davao Oriental"
 },
 {
   value: "Arteche, Eastern Samar",
   label: "Arteche, Eastern Samar"
 },
 {
   value: "Balangiga, Eastern Samar",
   label: "Balangiga, Eastern Samar"
 },
 {
   value: "Balangkayan, Eastern Samar",
   label: "Balangkayan, Eastern Samar"
 },
 {
   value: "Borongan, Eastern Samar",
   label: "Borongan, Eastern Samar"
 },
 {
   value: "Can-avid, Eastern Samar",
   label: "Can-avid, Eastern Samar"
 },
 {
   value: "Dolores, Eastern Samar",
   label: "Dolores, Eastern Samar"
 },
 {
   value: "General MacArthur, Eastern Samar",
   label: "General MacArthur, Eastern Samar"
 },
 {
   value: "Giporlos, Eastern Samar",
   label: "Giporlos, Eastern Samar"
 },
 {
   value: "Guiuan, Eastern Samar",
   label: "Guiuan, Eastern Samar"
 },
 {
   value: "Hernani, Eastern Samar",
   label: "Hernani, Eastern Samar"
 },
 {
   value: "Jipapad, Eastern Samar",
   label: "Jipapad, Eastern Samar"
 },
 {
   value: "Lawaan, Eastern Samar",
   label: "Lawaan, Eastern Samar"
 },
 {
   value: "Llorente, Eastern Samar",
   label: "Llorente, Eastern Samar"
 },
 {
   value: "Maslog, Eastern Samar",
   label: "Maslog, Eastern Samar"
 },
 {
   value: "Maydolong, Eastern Samar",
   label: "Maydolong, Eastern Samar"
 },
 {
   value: "Mercedes, Eastern Samar",
   label: "Mercedes, Eastern Samar"
 },
 {
   value: "Oras, Eastern Samar",
   label: "Oras, Eastern Samar"
 },
 {
   value: "Quinapondan, Eastern Samar",
   label: "Quinapondan, Eastern Samar"
 },
 {
   value: "Salcedo, Eastern Samar",
   label: "Salcedo, Eastern Samar"
 },
 {
   value: "San Julian, Eastern Samar",
   label: "San Julian, Eastern Samar"
 },
 {
   value: "San Policarpo, Eastern Samar",
   label: "San Policarpo, Eastern Samar"
 },
 {
   value: "Sulat, Eastern Samar",
   label: "Sulat, Eastern Samar"
 },
 {
   value: "Taft, Eastern Samar",
   label: "Taft, Eastern Samar"
 },
 {
   value: "Buenavista, Guimaras",
   label: "Buenavista, Guimaras"
 },
 {
   value: "Jordan, Guimaras",
   label: "Jordan, Guimaras"
 },
 {
   value: "Nueva Valencia, Guimaras",
   label: "Nueva Valencia, Guimaras"
 },
 {
   value: "San Lorenzo, Guimaras",
   label: "San Lorenzo, Guimaras"
 },
 {
   value: "Sibunag, Guimaras",
   label: "Sibunag, Guimaras"
 },
 {
   value: "Aguinaldo, Ifugao",
   label: "Aguinaldo, Ifugao"
 },
 {
   value: "Alfonso Lista, Ifugao",
   label: "Alfonso Lista, Ifugao"
 },
 {
   value: "Asipulo, Ifugao",
   label: "Asipulo, Ifugao"
 },
 {
   value: "Banaue, Ifugao",
   label: "Banaue, Ifugao"
 },
 {
   value: "Hingyon, Ifugao",
   label: "Hingyon, Ifugao"
 },
 {
   value: "Hungduan, Ifugao",
   label: "Hungduan, Ifugao"
 },
 {
   value: "Kiangan, Ifugao",
   label: "Kiangan, Ifugao"
 },
 {
   value: "Lagawe, Ifugao",
   label: "Lagawe, Ifugao"
 },
 {
   value: "Lamut, Ifugao",
   label: "Lamut, Ifugao"
 },
 {
   value: "Mayoyao, Ifugao",
   label: "Mayoyao, Ifugao"
 },
 {
   value: "Tinoc, Ifugao",
   label: "Tinoc, Ifugao"
 },
 {
   value: "Batac City, Ilocos Norte",
   label: "Batac City, Ilocos Norte"
 },
 {
   value: "Laoag City, Ilocos Norte",
   label: "Laoag City, Ilocos Norte"
 },
 {
   value: "Adams, Ilocos Norte",
   label: "Adams, Ilocos Norte"
 },
 {
   value: "Bacarra, Ilocos Norte",
   label: "Bacarra, Ilocos Norte"
 },
 {
   value: "Badoc, Ilocos Norte",
   label: "Badoc, Ilocos Norte"
 },
 {
   value: "Bangui, Ilocos Norte",
   label: "Bangui, Ilocos Norte"
 },
 {
   value: "Banna, Ilocos Norte",
   label: "Banna, Ilocos Norte"
 },
 {
   value: "Burgos, Ilocos Norte",
   label: "Burgos, Ilocos Norte"
 },
 {
   value: "Carasi, Ilocos Norte",
   label: "Carasi, Ilocos Norte"
 },
 {
   value: "Currimao, Ilocos Norte",
   label: "Currimao, Ilocos Norte"
 },
 {
   value: "Dingras, Ilocos Norte",
   label: "Dingras, Ilocos Norte"
 },
 {
   value: "Dumalneg, Ilocos Norte",
   label: "Dumalneg, Ilocos Norte"
 },
 {
   value: "Marcos, Ilocos Norte",
   label: "Marcos, Ilocos Norte"
 },
 {
   value: "Nueva Era, Ilocos Norte",
   label: "Nueva Era, Ilocos Norte"
 },
 {
   value: "Pagudpud, Ilocos Norte",
   label: "Pagudpud, Ilocos Norte"
 },
 {
   value: "Paoay, Ilocos Norte",
   label: "Paoay, Ilocos Norte"
 },
 {
   value: "Pasuquin, Ilocos Norte",
   label: "Pasuquin, Ilocos Norte"
 },
 {
   value: "Piddig, Ilocos Norte",
   label: "Piddig, Ilocos Norte"
 },
 {
   value: "Pinili, Ilocos Norte",
   label: "Pinili, Ilocos Norte"
 },
 {
   value: "San Nicolas, Ilocos Norte",
   label: "San Nicolas, Ilocos Norte"
 },
 {
   value: "Sarrat, Ilocos Norte",
   label: "Sarrat, Ilocos Norte"
 },
 {
   value: "Solsona, Ilocos Norte",
   label: "Solsona, Ilocos Norte"
 },
 {
   value: "Vintar, Ilocos Norte",
   label: "Vintar, Ilocos Norte"
 },
 {
   value: "Candon City, Ilocos Sur",
   label: "Candon City, Ilocos Sur"
 },
 {
   value: "Vigan City, Ilocos Sur",
   label: "Vigan City, Ilocos Sur"
 },
 {
   value: "Alilem, Ilocos Sur",
   label: "Alilem, Ilocos Sur"
 },
 {
   value: "Banayoyo, Ilocos Sur",
   label: "Banayoyo, Ilocos Sur"
 },
 {
   value: "Bantay, Ilocos Sur",
   label: "Bantay, Ilocos Sur"
 },
 {
   value: "Burgos, Ilocos Sur",
   label: "Burgos, Ilocos Sur"
 },
 {
   value: "Cabugao, Ilocos Sur",
   label: "Cabugao, Ilocos Sur"
 },
 {
   value: "Caoayan, Ilocos Sur",
   label: "Caoayan, Ilocos Sur"
 },
 {
   value: "Cervantes, Ilocos Sur",
   label: "Cervantes, Ilocos Sur"
 },
 {
   value: "Galimuyod, Ilocos Sur",
   label: "Galimuyod, Ilocos Sur"
 },
 {
   value: "Gregorio Del Pilar, Ilocos Sur",
   label: "Gregorio Del Pilar, Ilocos Sur"
 },
 {
   value: "Lidlidda, Ilocos Sur",
   label: "Lidlidda, Ilocos Sur"
 },
 {
   value: "Magsingal, Ilocos Sur",
   label: "Magsingal, Ilocos Sur"
 },
 {
   value: "Nagbukel, Ilocos Sur",
   label: "Nagbukel, Ilocos Sur"
 },
 {
   value: "Narvacan, Ilocos Sur",
   label: "Narvacan, Ilocos Sur"
 },
 {
   value: "Quirino, Ilocos Sur",
   label: "Quirino, Ilocos Sur"
 },
 {
   value: "Salcedo, Ilocos Sur",
   label: "Salcedo, Ilocos Sur"
 },
 {
   value: "San Emilio, Ilocos Sur",
   label: "San Emilio, Ilocos Sur"
 },
 {
   value: "San Esteban, Ilocos Sur",
   label: "San Esteban, Ilocos Sur"
 },
 {
   value: "San Ildefonso, Ilocos Sur",
   label: "San Ildefonso, Ilocos Sur"
 },
 {
   value: "San Juan, Ilocos Sur",
   label: "San Juan, Ilocos Sur"
 },
 {
   value: "San Vicente, Ilocos Sur",
   label: "San Vicente, Ilocos Sur"
 },
 {
   value: "Santa, Ilocos Sur",
   label: "Santa, Ilocos Sur"
 },
 {
   value: "Santa Catalina, Ilocos Sur",
   label: "Santa Catalina, Ilocos Sur"
 },
 {
   value: "Santa Cruz, Ilocos Sur",
   label: "Santa Cruz, Ilocos Sur"
 },
 {
   value: "Santa Lucia, Ilocos Sur",
   label: "Santa Lucia, Ilocos Sur"
 },
 {
   value: "Santa Maria, Ilocos Sur",
   label: "Santa Maria, Ilocos Sur"
 },
 {
   value: "Santiago, Ilocos Sur",
   label: "Santiago, Ilocos Sur"
 },
 {
   value: "Santo Domingo, Ilocos Sur",
   label: "Santo Domingo, Ilocos Sur"
 },
 {
   value: "Sigay, Ilocos Sur",
   label: "Sigay, Ilocos Sur"
 },
 {
   value: "Sinait, Ilocos Sur",
   label: "Sinait, Ilocos Sur"
 },
 {
   value: "Sugpon, Ilocos Sur",
   label: "Sugpon, Ilocos Sur"
 },
 {
   value: "Suyo, Ilocos Sur",
   label: "Suyo, Ilocos Sur"
 },
 {
   value: "Tagudin, Ilocos Sur",
   label: "Tagudin, Ilocos Sur"
 },
 {
   value: "Iloilo City, Iloilo",
   label: "Iloilo City, Iloilo"
 },
 {
   value: "Passi City, Iloilo",
   label: "Passi City, Iloilo"
 },
 {
   value: "Ajuy, Iloilo",
   label: "Ajuy, Iloilo"
 },
 {
   value: "Alimodian, Iloilo",
   label: "Alimodian, Iloilo"
 },
 {
   value: "Anilao, Iloilo",
   label: "Anilao, Iloilo"
 },
 {
   value: "Badiangan, Iloilo",
   label: "Badiangan, Iloilo"
 },
 {
   value: "Balasan, Iloilo",
   label: "Balasan, Iloilo"
 },
 {
   value: "Banate, Iloilo",
   label: "Banate, Iloilo"
 },
 {
   value: "Barotac Nuevo, Iloilo",
   label: "Barotac Nuevo, Iloilo"
 },
 {
   value: "Barotac Viejo, Iloilo",
   label: "Barotac Viejo, Iloilo"
 },
 {
   value: "Batad, Iloilo",
   label: "Batad, Iloilo"
 },
 {
   value: "Bingawan, Iloilo",
   label: "Bingawan, Iloilo"
 },
 {
   value: "Cabatuan, Iloilo",
   label: "Cabatuan, Iloilo"
 },
 {
   value: "Calinog, Iloilo",
   label: "Calinog, Iloilo"
 },
 {
   value: "Carles, Iloilo",
   label: "Carles, Iloilo"
 },
 {
   value: "Concepcion, Iloilo",
   label: "Concepcion, Iloilo"
 },
 {
   value: "Dingle, Iloilo",
   label: "Dingle, Iloilo"
 },
 {
   value: "Dueñas, Iloilo",
   label: "Dueñas, Iloilo"
 },
 {
   value: "Dumangas, Iloilo",
   label: "Dumangas, Iloilo"
 },
 {
   value: "Estancia, Iloilo",
   label: "Estancia, Iloilo"
 },
 {
   value: "Guimbal, Iloilo",
   label: "Guimbal, Iloilo"
 },
 {
   value: "Igbaras, Iloilo",
   label: "Igbaras, Iloilo"
 },
 {
   value: "Janiuay, Iloilo",
   label: "Janiuay, Iloilo"
 },
 {
   value: "Lambunao, Iloilo",
   label: "Lambunao, Iloilo"
 },
 {
   value: "Leganes, Iloilo",
   label: "Leganes, Iloilo"
 },
 {
   value: "Lemery, Iloilo",
   label: "Lemery, Iloilo"
 },
 {
   value: "Leon, Iloilo",
   label: "Leon, Iloilo"
 },
 {
   value: "Maasin, Iloilo",
   label: "Maasin, Iloilo"
 },
 {
   value: "Miagao, Iloilo",
   label: "Miagao, Iloilo"
 },
 {
   value: "Mina, Iloilo",
   label: "Mina, Iloilo"
 },
 {
   value: "New Lucena, Iloilo",
   label: "New Lucena, Iloilo"
 },
 {
   value: "Oton, Iloilo",
   label: "Oton, Iloilo"
 },
 {
   value: "Pavia, Iloilo",
   label: "Pavia, Iloilo"
 },
 {
   value: "Pototan, Iloilo",
   label: "Pototan, Iloilo"
 },
 {
   value: "San Dionisio, Iloilo",
   label: "San Dionisio, Iloilo"
 },
 {
   value: "San Enrique, Iloilo",
   label: "San Enrique, Iloilo"
 },
 {
   value: "San Joaquin, Iloilo",
   label: "San Joaquin, Iloilo"
 },
 {
   value: "San Miguel, Iloilo",
   label: "San Miguel, Iloilo"
 },
 {
   value: "San Rafael, Iloilo",
   label: "San Rafael, Iloilo"
 },
 {
   value: "Santa Barbara, Iloilo",
   label: "Santa Barbara, Iloilo"
 },
 {
   value: "Sara, Iloilo",
   label: "Sara, Iloilo"
 },
 {
   value: "Tigbauan, Iloilo",
   label: "Tigbauan, Iloilo"
 },
 {
   value: "Tubungan, Iloilo",
   label: "Tubungan, Iloilo"
 },
 {
   value: "Zarraga, Iloilo",
   label: "Zarraga, Iloilo"
 },
 {
   value: "Cauayan City, Isabela",
   label: "Cauayan City, Isabela"
 },
 {
   value: "Santiago City, Isabela",
   label: "Santiago City, Isabela"
 },
 {
   value: "Alicia, Isabela",
   label: "Alicia, Isabela"
 },
 {
   value: "Angadanan, Isabela",
   label: "Angadanan, Isabela"
 },
 {
   value: "Aurora, Isabela",
   label: "Aurora, Isabela"
 },
 {
   value: "Benito Soliven, Isabela",
   label: "Benito Soliven, Isabela"
 },
 {
   value: "Burgos, Isabela",
   label: "Burgos, Isabela"
 },
 {
   value: "Cabagan, Isabela",
   label: "Cabagan, Isabela"
 },
 {
   value: "Cabatuan, Isabela",
   label: "Cabatuan, Isabela"
 },
 {
   value: "Cordon, Isabela",
   label: "Cordon, Isabela"
 },
 {
   value: "Delfin Albano, Isabela",
   label: "Delfin Albano, Isabela"
 },
 {
   value: "Dinapigue, Isabela",
   label: "Dinapigue, Isabela"
 },
 {
   value: "Divilacan, Isabela",
   label: "Divilacan, Isabela"
 },
 {
   value: "Echague, Isabela",
   label: "Echague, Isabela"
 },
 {
   value: "Gamu, Isabela",
   label: "Gamu, Isabela"
 },
 {
   value: "Ilagan, Isabela",
   label: "Ilagan, Isabela"
 },
 {
   value: "Jones, Isabela",
   label: "Jones, Isabela"
 },
 {
   value: "Luna, Isabela",
   label: "Luna, Isabela"
 },
 {
   value: "Maconacon, Isabela",
   label: "Maconacon, Isabela"
 },
 {
   value: "Mallig, Isabela",
   label: "Mallig, Isabela"
 },
 {
   value: "Naguilian, Isabela",
   label: "Naguilian, Isabela"
 },
 {
   value: "Palanan, Isabela",
   label: "Palanan, Isabela"
 },
 {
   value: "Quezon, Isabela",
   label: "Quezon, Isabela"
 },
 {
   value: "Quirino, Isabela",
   label: "Quirino, Isabela"
 },
 {
   value: "Ramon, Isabela",
   label: "Ramon, Isabela"
 },
 {
   value: "Reina Mercedes, Isabela",
   label: "Reina Mercedes, Isabela"
 },
 {
   value: "Roxas, Isabela",
   label: "Roxas, Isabela"
 },
 {
   value: "San Agustin, Isabela",
   label: "San Agustin, Isabela"
 },
 {
   value: "San Guillermo, Isabela",
   label: "San Guillermo, Isabela"
 },
 {
   value: "San Isidro, Isabela",
   label: "San Isidro, Isabela"
 },
 {
   value: "San Manuel, Isabela",
   label: "San Manuel, Isabela"
 },
 {
   value: "San Mariano, Isabela",
   label: "San Mariano, Isabela"
 },
 {
   value: "San Mateo, Isabela",
   label: "San Mateo, Isabela"
 },
 {
   value: "San Pablo, Isabela",
   label: "San Pablo, Isabela"
 },
 {
   value: "Santa Maria, Isabela",
   label: "Santa Maria, Isabela"
 },
 {
   value: "Santo Tomas, Isabela",
   label: "Santo Tomas, Isabela"
 },
 {
   value: "Tumauini, Isabela",
   label: "Tumauini, Isabela"
 },
 {
   value: "Tabuk, Kalinga",
   label: "Tabuk, Kalinga"
 },
 {
   value: "Balbalan, Kalinga",
   label: "Balbalan, Kalinga"
 },
 {
   value: "Lubuagan, Kalinga",
   label: "Lubuagan, Kalinga"
 },
 {
   value: "Pasil, Kalinga",
   label: "Pasil, Kalinga"
 },
 {
   value: "Pinukpuk, Kalinga",
   label: "Pinukpuk, Kalinga"
 },
 {
   value: "Rizal, Kalinga",
   label: "Rizal, Kalinga"
 },
 {
   value: "Tanudan, Kalinga",
   label: "Tanudan, Kalinga"
 },
 {
   value: "Tinglayan, Kalinga",
   label: "Tinglayan, Kalinga"
 },
 {
   value: "San Fernando City, La Union",
   label: "San Fernando City, La Union"
 },
 {
   value: "Agoo, La Union",
   label: "Agoo, La Union"
 },
 {
   value: "Aringay, La Union",
   label: "Aringay, La Union"
 },
 {
   value: "Bacnotan, La Union",
   label: "Bacnotan, La Union"
 },
 {
   value: "Bagulin, La Union",
   label: "Bagulin, La Union"
 },
 {
   value: "Balaoan, La Union",
   label: "Balaoan, La Union"
 },
 {
   value: "Bangar, La Union",
   label: "Bangar, La Union"
 },
 {
   value: "Bauang, La Union",
   label: "Bauang, La Union"
 },
 {
   value: "Burgos, La Union",
   label: "Burgos, La Union"
 },
 {
   value: "Caba, La Union",
   label: "Caba, La Union"
 },
 {
   value: "Luna, La Union",
   label: "Luna, La Union"
 },
 {
   value: "Naguilian, La Union",
   label: "Naguilian, La Union"
 },
 {
   value: "Pugo, La Union",
   label: "Pugo, La Union"
 },
 {
   value: "Rosario, La Union",
   label: "Rosario, La Union"
 },
 {
   value: "San Gabriel, La Union",
   label: "San Gabriel, La Union"
 },
 {
   value: "San Juan, La Union",
   label: "San Juan, La Union"
 },
 {
   value: "Santo Tomas, La Union",
   label: "Santo Tomas, La Union"
 },
 {
   value: "Santol, La Union",
   label: "Santol, La Union"
 },
 {
   value: "Sudipen, La Union",
   label: "Sudipen, La Union"
 },
 {
   value: "Tubao, La Union",
   label: "Tubao, La Union"
 },
 {
   value: "Biñan City, Laguna",
   label: "Biñan City, Laguna"
 },
 {
   value: "Calamba City, Laguna",
   label: "Calamba City, Laguna"
 },
 {
   value: "San Pablo City, Laguna",
   label: "San Pablo City, Laguna"
 },
 {
   value: "Santa Rosa City, Laguna",
   label: "Santa Rosa City, Laguna"
 },
 {
   value: "Alaminos, Laguna",
   label: "Alaminos, Laguna"
 },
 {
   value: "Bay, Laguna",
   label: "Bay, Laguna"
 },
 {
   value: "Cabuyao, Laguna",
   label: "Cabuyao, Laguna"
 },
 {
   value: "Calauan, Laguna",
   label: "Calauan, Laguna"
 },
 {
   value: "Cavinti, Laguna",
   label: "Cavinti, Laguna"
 },
 {
   value: "Famy, Laguna",
   label: "Famy, Laguna"
 },
 {
   value: "Kalayaan, Laguna",
   label: "Kalayaan, Laguna"
 },
 {
   value: "Liliw, Laguna",
   label: "Liliw, Laguna"
 },
 {
   value: "Los Baños, Laguna",
   label: "Los Baños, Laguna"
 },
 {
   value: "Luisiana, Laguna",
   label: "Luisiana, Laguna"
 },
 {
   value: "Lumban, Laguna",
   label: "Lumban, Laguna"
 },
 {
   value: "Mabitac, Laguna",
   label: "Mabitac, Laguna"
 },
 {
   value: "Magdalena, Laguna",
   label: "Magdalena, Laguna"
 },
 {
   value: "Majayjay, Laguna",
   label: "Majayjay, Laguna"
 },
 {
   value: "Nagcarlan, Laguna",
   label: "Nagcarlan, Laguna"
 },
 {
   value: "Paete, Laguna",
   label: "Paete, Laguna"
 },
 {
   value: "Pagsanjan, Laguna",
   label: "Pagsanjan, Laguna"
 },
 {
   value: "Pakil, Laguna",
   label: "Pakil, Laguna"
 },
 {
   value: "Pangil, Laguna",
   label: "Pangil, Laguna"
 },
 {
   value: "Pila, Laguna",
   label: "Pila, Laguna"
 },
 {
   value: "Rizal, Laguna",
   label: "Rizal, Laguna"
 },
 {
   value: "San Pedro, Laguna",
   label: "San Pedro, Laguna"
 },
 {
   value: "Santa Cruz, Laguna",
   label: "Santa Cruz, Laguna"
 },
 {
   value: "Santa Maria, Laguna",
   label: "Santa Maria, Laguna"
 },
 {
   value: "Siniloan, Laguna",
   label: "Siniloan, Laguna"
 },
 {
   value: "Victoria, Laguna",
   label: "Victoria, Laguna"
 },
 {
   value: "Iligan City, Lanao del Norte",
   label: "Iligan City, Lanao del Norte"
 },
 {
   value: "Bacolod, Lanao del Norte",
   label: "Bacolod, Lanao del Norte"
 },
 {
   value: "Baloi, Lanao del Norte",
   label: "Baloi, Lanao del Norte"
 },
 {
   value: "Baroy, Lanao del Norte",
   label: "Baroy, Lanao del Norte"
 },
 {
   value: "Kapatagan, Lanao del Norte",
   label: "Kapatagan, Lanao del Norte"
 },
 {
   value: "Kauswagan, Lanao del Norte",
   label: "Kauswagan, Lanao del Norte"
 },
 {
   value: "Kolambugan, Lanao del Norte",
   label: "Kolambugan, Lanao del Norte"
 },
 {
   value: "Lala, Lanao del Norte",
   label: "Lala, Lanao del Norte"
 },
 {
   value: "Linamon, Lanao del Norte",
   label: "Linamon, Lanao del Norte"
 },
 {
   value: "Magsaysay, Lanao del Norte",
   label: "Magsaysay, Lanao del Norte"
 },
 {
   value: "Maigo, Lanao del Norte",
   label: "Maigo, Lanao del Norte"
 },
 {
   value: "Matungao, Lanao del Norte",
   label: "Matungao, Lanao del Norte"
 },
 {
   value: "Munai, Lanao del Norte",
   label: "Munai, Lanao del Norte"
 },
 {
   value: "Nunungan, Lanao del Norte",
   label: "Nunungan, Lanao del Norte"
 },
 {
   value: "Pantao Ragat, Lanao del Norte",
   label: "Pantao Ragat, Lanao del Norte"
 },
 {
   value: "Pantar, Lanao del Norte",
   label: "Pantar, Lanao del Norte"
 },
 {
   value: "Poona Piagapo, Lanao del Norte",
   label: "Poona Piagapo, Lanao del Norte"
 },
 {
   value: "Salvador, Lanao del Norte",
   label: "Salvador, Lanao del Norte"
 },
 {
   value: "Sapad, Lanao del Norte",
   label: "Sapad, Lanao del Norte"
 },
 {
   value: "Sultan Naga Dimaporo, Lanao del Norte",
   label: "Sultan Naga Dimaporo, Lanao del Norte"
 },
 {
   value: "Tagoloan, Lanao del Norte",
   label: "Tagoloan, Lanao del Norte"
 },
 {
   value: "Tangcal, Lanao del Norte",
   label: "Tangcal, Lanao del Norte"
 },
 {
   value: "Tubod, Lanao del Norte",
   label: "Tubod, Lanao del Norte"
 },
 {
   value: "Marawi City, Lanao del Sur",
   label: "Marawi City, Lanao del Sur"
 },
 {
   value: "Bacolod-Kalawi, Lanao del Sur",
   label: "Bacolod-Kalawi, Lanao del Sur"
 },
 {
   value: "Balabagan, Lanao del Sur",
   label: "Balabagan, Lanao del Sur"
 },
 {
   value: "Balindong, Lanao del Sur",
   label: "Balindong, Lanao del Sur"
 },
 {
   value: "Bayang, Lanao del Sur",
   label: "Bayang, Lanao del Sur"
 },
 {
   value: "Binidayan, Lanao del Sur",
   label: "Binidayan, Lanao del Sur"
 },
 {
   value: "Buadiposo-Buntong, Lanao del Sur",
   label: "Buadiposo-Buntong, Lanao del Sur"
 },
 {
   value: "Bubong, Lanao del Sur",
   label: "Bubong, Lanao del Sur"
 },
 {
   value: "Bumbaran, Lanao del Sur",
   label: "Bumbaran, Lanao del Sur"
 },
 {
   value: "Butig, Lanao del Sur",
   label: "Butig, Lanao del Sur"
 },
 {
   value: "Calanogas, Lanao del Sur",
   label: "Calanogas, Lanao del Sur"
 },
 {
   value: "Ditsaan-Ramain, Lanao del Sur",
   label: "Ditsaan-Ramain, Lanao del Sur"
 },
 {
   value: "Ganassi, Lanao del Sur",
   label: "Ganassi, Lanao del Sur"
 },
 {
   value: "Kapai, Lanao del Sur",
   label: "Kapai, Lanao del Sur"
 },
 {
   value: "Kapatagan, Lanao del Sur",
   label: "Kapatagan, Lanao del Sur"
 },
 {
   value: "Lumba-Bayabao, Lanao del Sur",
   label: "Lumba-Bayabao, Lanao del Sur"
 },
 {
   value: "Lumbaca-Unayan, Lanao del Sur",
   label: "Lumbaca-Unayan, Lanao del Sur"
 },
 {
   value: "Lumbatan, Lanao del Sur",
   label: "Lumbatan, Lanao del Sur"
 },
 {
   value: "Lumbayanague, Lanao del Sur",
   label: "Lumbayanague, Lanao del Sur"
 },
 {
   value: "Madalum, Lanao del Sur",
   label: "Madalum, Lanao del Sur"
 },
 {
   value: "Madamba, Lanao del Sur",
   label: "Madamba, Lanao del Sur"
 },
 {
   value: "Maguing, Lanao del Sur",
   label: "Maguing, Lanao del Sur"
 },
 {
   value: "Malabang, Lanao del Sur",
   label: "Malabang, Lanao del Sur"
 },
 {
   value: "Marantao, Lanao del Sur",
   label: "Marantao, Lanao del Sur"
 },
 {
   value: "Marogong, Lanao del Sur",
   label: "Marogong, Lanao del Sur"
 },
 {
   value: "Masiu, Lanao del Sur",
   label: "Masiu, Lanao del Sur"
 },
 {
   value: "Mulondo, Lanao del Sur",
   label: "Mulondo, Lanao del Sur"
 },
 {
   value: "Pagayawan, Lanao del Sur",
   label: "Pagayawan, Lanao del Sur"
 },
 {
   value: "Piagapo, Lanao del Sur",
   label: "Piagapo, Lanao del Sur"
 },
 {
   value: "Poona Bayabao, Lanao del Sur",
   label: "Poona Bayabao, Lanao del Sur"
 },
 {
   value: "Pualas, Lanao del Sur",
   label: "Pualas, Lanao del Sur"
 },
 {
   value: "Saguiaran, Lanao del Sur",
   label: "Saguiaran, Lanao del Sur"
 },
 {
   value: "Sultan Dumalondong, Lanao del Sur",
   label: "Sultan Dumalondong, Lanao del Sur"
 },
 {
   value: "Picong, Lanao del Sur",
   label: "Picong, Lanao del Sur"
 },
 {
   value: "Tagoloan II, Lanao del Sur",
   label: "Tagoloan II, Lanao del Sur"
 },
 {
   value: "Tamparan, Lanao del Sur",
   label: "Tamparan, Lanao del Sur"
 },
 {
   value: "Taraka, Lanao del Sur",
   label: "Taraka, Lanao del Sur"
 },
 {
   value: "Tubaran, Lanao del Sur",
   label: "Tubaran, Lanao del Sur"
 },
 {
   value: "Tugaya, Lanao del Sur",
   label: "Tugaya, Lanao del Sur"
 },
 {
   value: "Wao, Lanao del Sur",
   label: "Wao, Lanao del Sur"
 },
 {
   value: "Ormoc City, Leyte",
   label: "Ormoc City, Leyte"
 },
 {
   value: "Tacloban City, Leyte",
   label: "Tacloban City, Leyte"
 },
 {
   value: "Abuyog, Leyte",
   label: "Abuyog, Leyte"
 },
 {
   value: "Alangalang, Leyte",
   label: "Alangalang, Leyte"
 },
 {
   value: "Albuera, Leyte",
   label: "Albuera, Leyte"
 },
 {
   value: "Babatngon, Leyte",
   label: "Babatngon, Leyte"
 },
 {
   value: "Barugo, Leyte",
   label: "Barugo, Leyte"
 },
 {
   value: "Bato, Leyte",
   label: "Bato, Leyte"
 },
 {
   value: "Baybay, Leyte",
   label: "Baybay, Leyte"
 },
 {
   value: "Burauen, Leyte",
   label: "Burauen, Leyte"
 },
 {
   value: "Calubian, Leyte",
   label: "Calubian, Leyte"
 },
 {
   value: "Capoocan, Leyte",
   label: "Capoocan, Leyte"
 },
 {
   value: "Carigara, Leyte",
   label: "Carigara, Leyte"
 },
 {
   value: "Dagami, Leyte",
   label: "Dagami, Leyte"
 },
 {
   value: "Dulag, Leyte",
   label: "Dulag, Leyte"
 },
 {
   value: "Hilongos, Leyte",
   label: "Hilongos, Leyte"
 },
 {
   value: "Hindang, Leyte",
   label: "Hindang, Leyte"
 },
 {
   value: "Inopacan, Leyte",
   label: "Inopacan, Leyte"
 },
 {
   value: "Isabel, Leyte",
   label: "Isabel, Leyte"
 },
 {
   value: "Jaro, Leyte",
   label: "Jaro, Leyte"
 },
 {
   value: "Javier, Leyte",
   label: "Javier, Leyte"
 },
 {
   value: "Julita, Leyte",
   label: "Julita, Leyte"
 },
 {
   value: "Kananga, Leyte",
   label: "Kananga, Leyte"
 },
 {
   value: "La Paz, Leyte",
   label: "La Paz, Leyte"
 },
 {
   value: "Leyte, Leyte",
   label: "Leyte, Leyte"
 },
 {
   value: "Liloan, Leyte",
   label: "Liloan, Leyte"
 },
 {
   value: "MacArthur, Leyte",
   label: "MacArthur, Leyte"
 },
 {
   value: "Mahaplag, Leyte",
   label: "Mahaplag, Leyte"
 },
 {
   value: "Matag-ob, Leyte",
   label: "Matag-ob, Leyte"
 },
 {
   value: "Matalom, Leyte",
   label: "Matalom, Leyte"
 },
 {
   value: "Mayorga, Leyte",
   label: "Mayorga, Leyte"
 },
 {
   value: "Merida, Leyte",
   label: "Merida, Leyte"
 },
 {
   value: "Palo, Leyte",
   label: "Palo, Leyte"
 },
 {
   value: "Palompon, Leyte",
   label: "Palompon, Leyte"
 },
 {
   value: "Pastrana, Leyte",
   label: "Pastrana, Leyte"
 },
 {
   value: "San Isidro, Leyte",
   label: "San Isidro, Leyte"
 },
 {
   value: "San Miguel, Leyte",
   label: "San Miguel, Leyte"
 },
 {
   value: "Santa Fe, Leyte",
   label: "Santa Fe, Leyte"
 },
 {
   value: "Sogod, Leyte",
   label: "Sogod, Leyte"
 },
 {
   value: "Tabango, Leyte",
   label: "Tabango, Leyte"
 },
 {
   value: "Tabontabon, Leyte",
   label: "Tabontabon, Leyte"
 },
 {
   value: "Tanauan, Leyte",
   label: "Tanauan, Leyte"
 },
 {
   value: "Tolosa, Leyte",
   label: "Tolosa, Leyte"
 },
 {
   value: "Tunga, Leyte",
   label: "Tunga, Leyte"
 },
 {
   value: "Villaba, Leyte",
   label: "Villaba, Leyte"
 },
 {
   value: "Cotabato City, Maguindanao",
   label: "Cotabato City, Maguindanao"
 },
 {
   value: "Ampatuan, Maguindanao",
   label: "Ampatuan, Maguindanao"
 },
 {
   value: "Barira, Maguindanao",
   label: "Barira, Maguindanao"
 },
 {
   value: "Buldon, Maguindanao",
   label: "Buldon, Maguindanao"
 },
 {
   value: "Buluan, Maguindanao",
   label: "Buluan, Maguindanao"
 },
 {
   value: "Datu Abdullah Sangki, Maguindanao",
   label: "Datu Abdullah Sangki, Maguindanao"
 },
 {
   value: "Datu Anggal Midtimbang, Maguindanao",
   label: "Datu Anggal Midtimbang, Maguindanao"
 },
 {
   value: "Datu Blah T. Sinsuat, Maguindanao",
   label: "Datu Blah T. Sinsuat, Maguindanao"
 },
 {
   value: "Datu Hoffer Ampatuan, Maguindanao",
   label: "Datu Hoffer Ampatuan, Maguindanao"
 },
 {
   value: "Datu Montawal, Maguindanao",
   label: "Datu Montawal, Maguindanao"
 },
 {
   value: "Datu Odin Sinsuat, Maguindanao",
   label: "Datu Odin Sinsuat, Maguindanao"
 },
 {
   value: "Datu Paglas, Maguindanao",
   label: "Datu Paglas, Maguindanao"
 },
 {
   value: "Datu Piang, Maguindanao",
   label: "Datu Piang, Maguindanao"
 },
 {
   value: "Datu Salibo, Maguindanao",
   label: "Datu Salibo, Maguindanao"
 },
 {
   value: "Datu Saudi-Ampatuan, Maguindanao",
   label: "Datu Saudi-Ampatuan, Maguindanao"
 },
 {
   value: "Datu Unsay, Maguindanao",
   label: "Datu Unsay, Maguindanao"
 },
 {
   value: "General Salipada K. Pendatun, Maguindanao",
   label: "General Salipada K. Pendatun, Maguindanao"
 },
 {
   value: "Guindulungan, Maguindanao",
   label: "Guindulungan, Maguindanao"
 },
 {
   value: "Kabuntalan, Maguindanao",
   label: "Kabuntalan, Maguindanao"
 },
 {
   value: "Mamasapano, Maguindanao",
   label: "Mamasapano, Maguindanao"
 },
 {
   value: "Mangudadatu, Maguindanao",
   label: "Mangudadatu, Maguindanao"
 },
 {
   value: "Matanog, Maguindanao",
   label: "Matanog, Maguindanao"
 },
 {
   value: "Northern Kabuntalan, Maguindanao",
   label: "Northern Kabuntalan, Maguindanao"
 },
 {
   value: "Pagalungan, Maguindanao",
   label: "Pagalungan, Maguindanao"
 },
 {
   value: "Paglat, Maguindanao",
   label: "Paglat, Maguindanao"
 },
 {
   value: "Pandag, Maguindanao",
   label: "Pandag, Maguindanao"
 },
 {
   value: "Parang, Maguindanao",
   label: "Parang, Maguindanao"
 },
 {
   value: "Rajah Buayan, Maguindanao",
   label: "Rajah Buayan, Maguindanao"
 },
 {
   value: "Shariff Aguak, Maguindanao",
   label: "Shariff Aguak, Maguindanao"
 },
 {
   value: "Shariff Saydona Mustapha, Maguindanao",
   label: "Shariff Saydona Mustapha, Maguindanao"
 },
 {
   value: "South Upi, Maguindanao",
   label: "South Upi, Maguindanao"
 },
 {
   value: "Sultan Kudarat, Maguindanao",
   label: "Sultan Kudarat, Maguindanao"
 },
 {
   value: "Sultan Mastura, Maguindanao",
   label: "Sultan Mastura, Maguindanao"
 },
 {
   value: "Sultan sa Barongis, Maguindanao",
   label: "Sultan sa Barongis, Maguindanao"
 },
 {
   value: "Talayan, Maguindanao",
   label: "Talayan, Maguindanao"
 },
 {
   value: "Talitay, Maguindanao",
   label: "Talitay, Maguindanao"
 },
 {
   value: "Upi, Maguindanao",
   label: "Upi, Maguindanao"
 },
 {
   value: "Boac, Marinduque",
   label: "Boac, Marinduque"
 },
 {
   value: "Buenavista, Marinduque",
   label: "Buenavista, Marinduque"
 },
 {
   value: "Gasan, Marinduque",
   label: "Gasan, Marinduque"
 },
 {
   value: "Mogpog, Marinduque",
   label: "Mogpog, Marinduque"
 },
 {
   value: "Santa Cruz, Marinduque",
   label: "Santa Cruz, Marinduque"
 },
 {
   value: "Torrijos, Marinduque",
   label: "Torrijos, Marinduque"
 },
 {
   value: "Masbate City, Masbate",
   label: "Masbate City, Masbate"
 },
 {
   value: "Aroroy, Masbate",
   label: "Aroroy, Masbate"
 },
 {
   value: "Baleno, Masbate",
   label: "Baleno, Masbate"
 },
 {
   value: "Balud, Masbate",
   label: "Balud, Masbate"
 },
 {
   value: "Batuan, Masbate",
   label: "Batuan, Masbate"
 },
 {
   value: "Cataingan, Masbate",
   label: "Cataingan, Masbate"
 },
 {
   value: "Cawayan, Masbate",
   label: "Cawayan, Masbate"
 },
 {
   value: "Claveria, Masbate",
   label: "Claveria, Masbate"
 },
 {
   value: "Dimasalang, Masbate",
   label: "Dimasalang, Masbate"
 },
 {
   value: "Esperanza, Masbate",
   label: "Esperanza, Masbate"
 },
 {
   value: "Mandaon, Masbate",
   label: "Mandaon, Masbate"
 },
 {
   value: "Milagros, Masbate",
   label: "Milagros, Masbate"
 },
 {
   value: "Mobo, Masbate",
   label: "Mobo, Masbate"
 },
 {
   value: "Monreal, Masbate",
   label: "Monreal, Masbate"
 },
 {
   value: "Palanas, Masbate",
   label: "Palanas, Masbate"
 },
 {
   value: "Pio V. Corpuz, Masbate",
   label: "Pio V. Corpuz, Masbate"
 },
 {
   value: "Placer, Masbate",
   label: "Placer, Masbate"
 },
 {
   value: "San Fernando, Masbate",
   label: "San Fernando, Masbate"
 },
 {
   value: "San Jacinto, Masbate",
   label: "San Jacinto, Masbate"
 },
 {
   value: "San Pascual, Masbate",
   label: "San Pascual, Masbate"
 },
 {
   value: "Uson, Masbate",
   label: "Uson, Masbate"
 },
 {
   value: "Caloocan, Metro Manila",
   label: "Caloocan, Metro Manila"
 },
 {
   value: "Las Piñas, Metro Manila",
   label: "Las Piñas, Metro Manila"
 },
 {
   value: "Makati, Metro Manila",
   label: "Makati, Metro Manila"
 },
 {
   value: "Malabon, Metro Manila",
   label: "Malabon, Metro Manila"
 },
 {
   value: "Mandaluyong, Metro Manila",
   label: "Mandaluyong, Metro Manila"
 },
 {
   value: "Manila, Metro Manila",
   label: "Manila, Metro Manila"
 },
 {
   value: "Marikina, Metro Manila",
   label: "Marikina, Metro Manila"
 },
 {
   value: "Muntinlupa, Metro Manila",
   label: "Muntinlupa, Metro Manila"
 },
 {
   value: "Navotas, Metro Manila",
   label: "Navotas, Metro Manila"
 },
 {
   value: "Parañaque, Metro Manila",
   label: "Parañaque, Metro Manila"
 },
 {
   value: "Pasay, Metro Manila",
   label: "Pasay, Metro Manila"
 },
 {
   value: "Pasig, Metro Manila",
   label: "Pasig, Metro Manila"
 },
 {
   value: "Quezon City, Metro Manila",
   label: "Quezon City, Metro Manila"
 },
 {
   value: "San Juan City, Metro Manila",
   label: "San Juan City, Metro Manila"
 },
 {
   value: "Taguig, Metro Manila",
   label: "Taguig, Metro Manila"
 },
 {
   value: "Valenzuela City, Metro Manila",
   label: "Valenzuela City, Metro Manila"
 },
 {
   value: "Pateros, Metro Manila",
   label: "Pateros, Metro Manila"
 },
 {
   value: "Oroquieta City, Misamis Occidental",
   label: "Oroquieta City, Misamis Occidental"
 },
 {
   value: "Ozamiz City, Misamis Occidental",
   label: "Ozamiz City, Misamis Occidental"
 },
 {
   value: "Tangub City, Misamis Occidental",
   label: "Tangub City, Misamis Occidental"
 },
 {
   value: "Aloran, Misamis Occidental",
   label: "Aloran, Misamis Occidental"
 },
 {
   value: "Baliangao, Misamis Occidental",
   label: "Baliangao, Misamis Occidental"
 },
 {
   value: "Bonifacio, Misamis Occidental",
   label: "Bonifacio, Misamis Occidental"
 },
 {
   value: "Calamba, Misamis Occidental",
   label: "Calamba, Misamis Occidental"
 },
 {
   value: "Clarin, Misamis Occidental",
   label: "Clarin, Misamis Occidental"
 },
 {
   value: "Concepcion, Misamis Occidental",
   label: "Concepcion, Misamis Occidental"
 },
 {
   value: "Don Victoriano Chiongbian, Misamis Occidental",
   label: "Don Victoriano Chiongbian, Misamis Occidental"
 },
 {
   value: "Jimenez, Misamis Occidental",
   label: "Jimenez, Misamis Occidental"
 },
 {
   value: "Lopez Jaena, Misamis Occidental",
   label: "Lopez Jaena, Misamis Occidental"
 },
 {
   value: "Panaon, Misamis Occidental",
   label: "Panaon, Misamis Occidental"
 },
 {
   value: "Plaridel, Misamis Occidental",
   label: "Plaridel, Misamis Occidental"
 },
 {
   value: "Sapang Dalaga, Misamis Occidental",
   label: "Sapang Dalaga, Misamis Occidental"
 },
 {
   value: "Sinacaban, Misamis Occidental",
   label: "Sinacaban, Misamis Occidental"
 },
 {
   value: "Tudela, Misamis Occidental",
   label: "Tudela, Misamis Occidental"
 },
 {
   value: "Cagayan de Oro, Misamis Oriental",
   label: "Cagayan de Oro, Misamis Oriental"
 },
 {
   value: "Gingoog City, Misamis Oriental",
   label: "Gingoog City, Misamis Oriental"
 },
 {
   value: "Alubijid, Misamis Oriental",
   label: "Alubijid, Misamis Oriental"
 },
 {
   value: "Balingasag, Misamis Oriental",
   label: "Balingasag, Misamis Oriental"
 },
 {
   value: "Balingoan, Misamis Oriental",
   label: "Balingoan, Misamis Oriental"
 },
 {
   value: "Binuangan, Misamis Oriental",
   label: "Binuangan, Misamis Oriental"
 },
 {
   value: "Claveria, Misamis Oriental",
   label: "Claveria, Misamis Oriental"
 },
 {
   value: "El Salvador, Misamis Oriental",
   label: "El Salvador, Misamis Oriental"
 },
 {
   value: "Gitagum, Misamis Oriental",
   label: "Gitagum, Misamis Oriental"
 },
 {
   value: "Initao, Misamis Oriental",
   label: "Initao, Misamis Oriental"
 },
 {
   value: "Jasaan, Misamis Oriental",
   label: "Jasaan, Misamis Oriental"
 },
 {
   value: "Kinoguitan, Misamis Oriental",
   label: "Kinoguitan, Misamis Oriental"
 },
 {
   value: "Lagonglong, Misamis Oriental",
   label: "Lagonglong, Misamis Oriental"
 },
 {
   value: "Laguindingan, Misamis Oriental",
   label: "Laguindingan, Misamis Oriental"
 },
 {
   value: "Libertad, Misamis Oriental",
   label: "Libertad, Misamis Oriental"
 },
 {
   value: "Lugait, Misamis Oriental",
   label: "Lugait, Misamis Oriental"
 },
 {
   value: "Magsaysay, Misamis Oriental",
   label: "Magsaysay, Misamis Oriental"
 },
 {
   value: "Manticao, Misamis Oriental",
   label: "Manticao, Misamis Oriental"
 },
 {
   value: "Medina, Misamis Oriental",
   label: "Medina, Misamis Oriental"
 },
 {
   value: "Naawan, Misamis Oriental",
   label: "Naawan, Misamis Oriental"
 },
 {
   value: "Opol, Misamis Oriental",
   label: "Opol, Misamis Oriental"
 },
 {
   value: "Salay, Misamis Oriental",
   label: "Salay, Misamis Oriental"
 },
 {
   value: "Sugbongcogon, Misamis Oriental",
   label: "Sugbongcogon, Misamis Oriental"
 },
 {
   value: "Tagoloan, Misamis Oriental",
   label: "Tagoloan, Misamis Oriental"
 },
 {
   value: "Talisayan, Misamis Oriental",
   label: "Talisayan, Misamis Oriental"
 },
 {
   value: "Villanueva, Misamis Oriental",
   label: "Villanueva, Misamis Oriental"
 },
 {
   value: "Barlig, Mountain Province",
   label: "Barlig, Mountain Province"
 },
 {
   value: "Bauko, Mountain Province",
   label: "Bauko, Mountain Province"
 },
 {
   value: "Besao, Mountain Province",
   label: "Besao, Mountain Province"
 },
 {
   value: "Bontoc, Mountain Province",
   label: "Bontoc, Mountain Province"
 },
 {
   value: "Natonin, Mountain Province",
   label: "Natonin, Mountain Province"
 },
 {
   value: "Paracelis, Mountain Province",
   label: "Paracelis, Mountain Province"
 },
 {
   value: "Sabangan, Mountain Province",
   label: "Sabangan, Mountain Province"
 },
 {
   value: "Sadanga, Mountain Province",
   label: "Sadanga, Mountain Province"
 },
 {
   value: "Sagada, Mountain Province",
   label: "Sagada, Mountain Province"
 },
 {
   value: "Tadian, Mountain Province",
   label: "Tadian, Mountain Province"
 },
 {
   value: "Bacolod City, Negros Occidental",
   label: "Bacolod City, Negros Occidental"
 },
 {
   value: "Bago City, Negros Occidental",
   label: "Bago City, Negros Occidental"
 },
 {
   value: "Cadiz City, Negros Occidental",
   label: "Cadiz City, Negros Occidental"
 },
 {
   value: "Escalante City, Negros Occidental",
   label: "Escalante City, Negros Occidental"
 },
 {
   value: "Himamaylan City, Negros Occidental",
   label: "Himamaylan City, Negros Occidental"
 },
 {
   value: "Kabankalan City, Negros Occidental",
   label: "Kabankalan City, Negros Occidental"
 },
 {
   value: "La Carlota City, Negros Occidental",
   label: "La Carlota City, Negros Occidental"
 },
 {
   value: "Sagay City, Negros Occidental",
   label: "Sagay City, Negros Occidental"
 },
 {
   value: "San Carlos City, Negros Occidental",
   label: "San Carlos City, Negros Occidental"
 },
 {
   value: "Silay City, Negros Occidental",
   label: "Silay City, Negros Occidental"
 },
 {
   value: "Sipalay City, Negros Occidental",
   label: "Sipalay City, Negros Occidental"
 },
 {
   value: "Talisay City, Negros Occidental",
   label: "Talisay City, Negros Occidental"
 },
 {
   value: "Victorias City, Negros Occidental",
   label: "Victorias City, Negros Occidental"
 },
 {
   value: "Binalbagan, Negros Occidental",
   label: "Binalbagan, Negros Occidental"
 },
 {
   value: "Calatrava, Negros Occidental",
   label: "Calatrava, Negros Occidental"
 },
 {
   value: "Candoni, Negros Occidental",
   label: "Candoni, Negros Occidental"
 },
 {
   value: "Cauayan, Negros Occidental",
   label: "Cauayan, Negros Occidental"
 },
 {
   value: "Enrique B. Magalona, Negros Occidental",
   label: "Enrique B. Magalona, Negros Occidental"
 },
 {
   value: "Hinigaran, Negros Occidental",
   label: "Hinigaran, Negros Occidental"
 },
 {
   value: "Hinoba-an, Negros Occidental",
   label: "Hinoba-an, Negros Occidental"
 },
 {
   value: "Ilog, Negros Occidental",
   label: "Ilog, Negros Occidental"
 },
 {
   value: "Isabela, Negros Occidental",
   label: "Isabela, Negros Occidental"
 },
 {
   value: "La Castellana, Negros Occidental",
   label: "La Castellana, Negros Occidental"
 },
 {
   value: "Manapla, Negros Occidental",
   label: "Manapla, Negros Occidental"
 },
 {
   value: "Moises Padilla, Negros Occidental",
   label: "Moises Padilla, Negros Occidental"
 },
 {
   value: "Murcia, Negros Occidental",
   label: "Murcia, Negros Occidental"
 },
 {
   value: "Pontevedra, Negros Occidental",
   label: "Pontevedra, Negros Occidental"
 },
 {
   value: "Pulupandan, Negros Occidental",
   label: "Pulupandan, Negros Occidental"
 },
 {
   value: "Salvador Benedicto, Negros Occidental",
   label: "Salvador Benedicto, Negros Occidental"
 },
 {
   value: "San Enrique, Negros Occidental",
   label: "San Enrique, Negros Occidental"
 },
 {
   value: "Toboso, Negros Occidental",
   label: "Toboso, Negros Occidental"
 },
 {
   value: "Valladolid, Negros Occidental",
   label: "Valladolid, Negros Occidental"
 },
 {
   value: "Bais City, Negros Oriental",
   label: "Bais City, Negros Oriental"
 },
 {
   value: "Bayawan City, Negros Oriental",
   label: "Bayawan City, Negros Oriental"
 },
 {
   value: "Canlaon City, Negros Oriental",
   label: "Canlaon City, Negros Oriental"
 },
 {
   value: "Guihulngan City, Negros Oriental",
   label: "Guihulngan City, Negros Oriental"
 },
 {
   value: "Dumaguete City, Negros Oriental",
   label: "Dumaguete City, Negros Oriental"
 },
 {
   value: "Tanjay City, Negros Oriental",
   label: "Tanjay City, Negros Oriental"
 },
 {
   value: "Amlan, Negros Oriental",
   label: "Amlan, Negros Oriental"
 },
 {
   value: "Ayungon, Negros Oriental",
   label: "Ayungon, Negros Oriental"
 },
 {
   value: "Bacong, Negros Oriental",
   label: "Bacong, Negros Oriental"
 },
 {
   value: "Basay, Negros Oriental",
   label: "Basay, Negros Oriental"
 },
 {
   value: "Bindoy, Negros Oriental",
   label: "Bindoy, Negros Oriental"
 },
 {
   value: "Dauin, Negros Oriental",
   label: "Dauin, Negros Oriental"
 },
 {
   value: "Jimalalud, Negros Oriental",
   label: "Jimalalud, Negros Oriental"
 },
 {
   value: "La Libertad, Negros Oriental",
   label: "La Libertad, Negros Oriental"
 },
 {
   value: "Mabinay, Negros Oriental",
   label: "Mabinay, Negros Oriental"
 },
 {
   value: "Manjuyod, Negros Oriental",
   label: "Manjuyod, Negros Oriental"
 },
 {
   value: "Pamplona, Negros Oriental",
   label: "Pamplona, Negros Oriental"
 },
 {
   value: "San Jose, Negros Oriental",
   label: "San Jose, Negros Oriental"
 },
 {
   value: "Santa Catalina, Negros Oriental",
   label: "Santa Catalina, Negros Oriental"
 },
 {
   value: "Siaton, Negros Oriental",
   label: "Siaton, Negros Oriental"
 },
 {
   value: "Sibulan, Negros Oriental",
   label: "Sibulan, Negros Oriental"
 },
 {
   value: "Tayasan, Negros Oriental",
   label: "Tayasan, Negros Oriental"
 },
 {
   value: "Valencia, Negros Oriental",
   label: "Valencia, Negros Oriental"
 },
 {
   value: "Vallehermoso, Negros Oriental",
   label: "Vallehermoso, Negros Oriental"
 },
 {
   value: "Zamboanguita, Negros Oriental",
   label: "Zamboanguita, Negros Oriental"
 },
 {
   value: "Allen, Northern Samar",
   label: "Allen, Northern Samar"
 },
 {
   value: "Biri, Northern Samar",
   label: "Biri, Northern Samar"
 },
 {
   value: "Bobon, Northern Samar",
   label: "Bobon, Northern Samar"
 },
 {
   value: "Capul, Northern Samar",
   label: "Capul, Northern Samar"
 },
 {
   value: "Catarman, Northern Samar",
   label: "Catarman, Northern Samar"
 },
 {
   value: "Catubig, Northern Samar",
   label: "Catubig, Northern Samar"
 },
 {
   value: "Gamay, Northern Samar",
   label: "Gamay, Northern Samar"
 },
 {
   value: "Laoang, Northern Samar",
   label: "Laoang, Northern Samar"
 },
 {
   value: "Lapinig, Northern Samar",
   label: "Lapinig, Northern Samar"
 },
 {
   value: "Las Navas, Northern Samar",
   label: "Las Navas, Northern Samar"
 },
 {
   value: "Lavezares, Northern Samar",
   label: "Lavezares, Northern Samar"
 },
 {
   value: "Lope de Vega, Northern Samar",
   label: "Lope de Vega, Northern Samar"
 },
 {
   value: "Mapanas, Northern Samar",
   label: "Mapanas, Northern Samar"
 },
 {
   value: "Mondragon, Northern Samar",
   label: "Mondragon, Northern Samar"
 },
 {
   value: "Palapag, Northern Samar",
   label: "Palapag, Northern Samar"
 },
 {
   value: "Pambujan, Northern Samar",
   label: "Pambujan, Northern Samar"
 },
 {
   value: "Rosario, Northern Samar",
   label: "Rosario, Northern Samar"
 },
 {
   value: "San Antonio, Northern Samar",
   label: "San Antonio, Northern Samar"
 },
 {
   value: "San Isidro, Northern Samar",
   label: "San Isidro, Northern Samar"
 },
 {
   value: "San Jose, Northern Samar",
   label: "San Jose, Northern Samar"
 },
 {
   value: "San Roque, Northern Samar",
   label: "San Roque, Northern Samar"
 },
 {
   value: "San Vicente, Northern Samar",
   label: "San Vicente, Northern Samar"
 },
 {
   value: "Silvino Lobos, Northern Samar",
   label: "Silvino Lobos, Northern Samar"
 },
 {
   value: "Victoria, Northern Samar",
   label: "Victoria, Northern Samar"
 },
 {
   value: "Cabanatuan City, Nueva Ecija",
   label: "Cabanatuan City, Nueva Ecija"
 },
 {
   value: "Gapan City, Nueva Ecija",
   label: "Gapan City, Nueva Ecija"
 },
 {
   value: "Science City of Muñoz, Nueva Ecija",
   label: "Science City of Muñoz, Nueva Ecija"
 },
 {
   value: "Palayan City, Nueva Ecija",
   label: "Palayan City, Nueva Ecija"
 },
 {
   value: "San Jose City, Nueva Ecija",
   label: "San Jose City, Nueva Ecija"
 },
 {
   value: "Aliaga, Nueva Ecija",
   label: "Aliaga, Nueva Ecija"
 },
 {
   value: "Bongabon, Nueva Ecija",
   label: "Bongabon, Nueva Ecija"
 },
 {
   value: "Cabiao, Nueva Ecija",
   label: "Cabiao, Nueva Ecija"
 },
 {
   value: "Carranglan, Nueva Ecija",
   label: "Carranglan, Nueva Ecija"
 },
 {
   value: "Cuyapo, Nueva Ecija",
   label: "Cuyapo, Nueva Ecija"
 },
 {
   value: "Gabaldon, Nueva Ecija",
   label: "Gabaldon, Nueva Ecija"
 },
 {
   value: "General Mamerto Natividad, Nueva Ecija",
   label: "General Mamerto Natividad, Nueva Ecija"
 },
 {
   value: "General Tinio, Nueva Ecija",
   label: "General Tinio, Nueva Ecija"
 },
 {
   value: "Guimba, Nueva Ecija",
   label: "Guimba, Nueva Ecija"
 },
 {
   value: "Jaen, Nueva Ecija",
   label: "Jaen, Nueva Ecija"
 },
 {
   value: "Laur, Nueva Ecija",
   label: "Laur, Nueva Ecija"
 },
 {
   value: "Licab, Nueva Ecija",
   label: "Licab, Nueva Ecija"
 },
 {
   value: "Llanera, Nueva Ecija",
   label: "Llanera, Nueva Ecija"
 },
 {
   value: "Lupao, Nueva Ecija",
   label: "Lupao, Nueva Ecija"
 },
 {
   value: "Nampicuan, Nueva Ecija",
   label: "Nampicuan, Nueva Ecija"
 },
 {
   value: "Pantabangan, Nueva Ecija",
   label: "Pantabangan, Nueva Ecija"
 },
 {
   value: "Peñaranda, Nueva Ecija",
   label: "Peñaranda, Nueva Ecija"
 },
 {
   value: "Quezon, Nueva Ecija",
   label: "Quezon, Nueva Ecija"
 },
 {
   value: "Rizal, Nueva Ecija",
   label: "Rizal, Nueva Ecija"
 },
 {
   value: "San Antonio, Nueva Ecija",
   label: "San Antonio, Nueva Ecija"
 },
 {
   value: "San Isidro, Nueva Ecija",
   label: "San Isidro, Nueva Ecija"
 },
 {
   value: "San Leonardo, Nueva Ecija",
   label: "San Leonardo, Nueva Ecija"
 },
 {
   value: "Santa Rosa, Nueva Ecija",
   label: "Santa Rosa, Nueva Ecija"
 },
 {
   value: "Santo Domingo, Nueva Ecija",
   label: "Santo Domingo, Nueva Ecija"
 },
 {
   value: "Talavera, Nueva Ecija",
   label: "Talavera, Nueva Ecija"
 },
 {
   value: "Talugtug, Nueva Ecija",
   label: "Talugtug, Nueva Ecija"
 },
 {
   value: "Zaragoza, Nueva Ecija",
   label: "Zaragoza, Nueva Ecija"
 },
 {
   value: "Alfonso Castaneda, Nueva Vizcaya",
   label: "Alfonso Castaneda, Nueva Vizcaya"
 },
 {
   value: "Ambaguio, Nueva Vizcaya",
   label: "Ambaguio, Nueva Vizcaya"
 },
 {
   value: "Aritao, Nueva Vizcaya",
   label: "Aritao, Nueva Vizcaya"
 },
 {
   value: "Bagabag, Nueva Vizcaya",
   label: "Bagabag, Nueva Vizcaya"
 },
 {
   value: "Bambang, Nueva Vizcaya",
   label: "Bambang, Nueva Vizcaya"
 },
 {
   value: "Bayombong, Nueva Vizcaya",
   label: "Bayombong, Nueva Vizcaya"
 },
 {
   value: "Diadi, Nueva Vizcaya",
   label: "Diadi, Nueva Vizcaya"
 },
 {
   value: "Dupax del Norte, Nueva Vizcaya",
   label: "Dupax del Norte, Nueva Vizcaya"
 },
 {
   value: "Dupax del Sur, Nueva Vizcaya",
   label: "Dupax del Sur, Nueva Vizcaya"
 },
 {
   value: "Kasibu, Nueva Vizcaya",
   label: "Kasibu, Nueva Vizcaya"
 },
 {
   value: "Kayapa, Nueva Vizcaya",
   label: "Kayapa, Nueva Vizcaya"
 },
 {
   value: "Quezon, Nueva Vizcaya",
   label: "Quezon, Nueva Vizcaya"
 },
 {
   value: "Santa Fe, Nueva Vizcaya",
   label: "Santa Fe, Nueva Vizcaya"
 },
 {
   value: "Solano, Nueva Vizcaya",
   label: "Solano, Nueva Vizcaya"
 },
 {
   value: "Villaverde, Nueva Vizcaya",
   label: "Villaverde, Nueva Vizcaya"
 },
 {
   value: "Abra de Ilog, Occidental Mindoro",
   label: "Abra de Ilog, Occidental Mindoro"
 },
 {
   value: "Calintaan, Occidental Mindoro",
   label: "Calintaan, Occidental Mindoro"
 },
 {
   value: "Looc, Occidental Mindoro",
   label: "Looc, Occidental Mindoro"
 },
 {
   value: "Lubang, Occidental Mindoro",
   label: "Lubang, Occidental Mindoro"
 },
 {
   value: "Magsaysay, Occidental Mindoro",
   label: "Magsaysay, Occidental Mindoro"
 },
 {
   value: "Mamburao, Occidental Mindoro",
   label: "Mamburao, Occidental Mindoro"
 },
 {
   value: "Paluan, Occidental Mindoro",
   label: "Paluan, Occidental Mindoro"
 },
 {
   value: "Rizal, Occidental Mindoro",
   label: "Rizal, Occidental Mindoro"
 },
 {
   value: "Sablayan, Occidental Mindoro",
   label: "Sablayan, Occidental Mindoro"
 },
 {
   value: "San Jose, Occidental Mindoro",
   label: "San Jose, Occidental Mindoro"
 },
 {
   value: "Santa Cruz, Occidental Mindoro",
   label: "Santa Cruz, Occidental Mindoro"
 },
 {
   value: "Calapan City, Oriental Mindoro",
   label: "Calapan City, Oriental Mindoro"
 },
 {
   value: "Baco, Oriental Mindoro",
   label: "Baco, Oriental Mindoro"
 },
 {
   value: "Bansud, Oriental Mindoro",
   label: "Bansud, Oriental Mindoro"
 },
 {
   value: "Bongabong, Oriental Mindoro",
   label: "Bongabong, Oriental Mindoro"
 },
 {
   value: "Bulalacao, Oriental Mindoro",
   label: "Bulalacao, Oriental Mindoro"
 },
 {
   value: "Gloria, Oriental Mindoro",
   label: "Gloria, Oriental Mindoro"
 },
 {
   value: "Mansalay, Oriental Mindoro",
   label: "Mansalay, Oriental Mindoro"
 },
 {
   value: "Naujan, Oriental Mindoro",
   label: "Naujan, Oriental Mindoro"
 },
 {
   value: "Pinamalayan, Oriental Mindoro",
   label: "Pinamalayan, Oriental Mindoro"
 },
 {
   value: "Pola, Oriental Mindoro",
   label: "Pola, Oriental Mindoro"
 },
 {
   value: "Puerto Galera, Oriental Mindoro",
   label: "Puerto Galera, Oriental Mindoro"
 },
 {
   value: "Roxas, Oriental Mindoro",
   label: "Roxas, Oriental Mindoro"
 },
 {
   value: "San Teodoro, Oriental Mindoro",
   label: "San Teodoro, Oriental Mindoro"
 },
 {
   value: "Socorro, Oriental Mindoro",
   label: "Socorro, Oriental Mindoro"
 },
 {
   value: "Victoria, Oriental Mindoro",
   label: "Victoria, Oriental Mindoro"
 },
 {
   value: "Puerto Princesa City, Palawan",
   label: "Puerto Princesa City, Palawan"
 },
 {
   value: "Aborlan, Palawan",
   label: "Aborlan, Palawan"
 },
 {
   value: "Agutaya, Palawan",
   label: "Agutaya, Palawan"
 },
 {
   value: "Araceli, Palawan",
   label: "Araceli, Palawan"
 },
 {
   value: "Balabac, Palawan",
   label: "Balabac, Palawan"
 },
 {
   value: "Bataraza, Palawan",
   label: "Bataraza, Palawan"
 },
 {
   value: "Brooke's Point, Palawan",
   label: "Brooke's Point, Palawan"
 },
 {
   value: "Busuanga, Palawan",
   label: "Busuanga, Palawan"
 },
 {
   value: "Cagayancillo, Palawan",
   label: "Cagayancillo, Palawan"
 },
 {
   value: "Coron, Palawan",
   label: "Coron, Palawan"
 },
 {
   value: "Culion, Palawan",
   label: "Culion, Palawan"
 },
 {
   value: "Cuyo, Palawan",
   label: "Cuyo, Palawan"
 },
 {
   value: "Dumaran, Palawan",
   label: "Dumaran, Palawan"
 },
 {
   value: "El Nido, Palawan",
   label: "El Nido, Palawan"
 },
 {
   value: "Kalayaan, Palawan",
   label: "Kalayaan, Palawan"
 },
 {
   value: "Linapacan, Palawan",
   label: "Linapacan, Palawan"
 },
 {
   value: "Magsaysay, Palawan",
   label: "Magsaysay, Palawan"
 },
 {
   value: "Narra, Palawan",
   label: "Narra, Palawan"
 },
 {
   value: "Quezon, Palawan",
   label: "Quezon, Palawan"
 },
 {
   value: "Rizal, Palawan",
   label: "Rizal, Palawan"
 },
 {
   value: "Roxas, Palawan",
   label: "Roxas, Palawan"
 },
 {
   value: "San Vicente, Palawan",
   label: "San Vicente, Palawan"
 },
 {
   value: "Sofronio Española, Palawan",
   label: "Sofronio Española, Palawan"
 },
 {
   value: "Taytay, Palawan",
   label: "Taytay, Palawan"
 },
 {
   value: "Angeles City, Pampanga",
   label: "Angeles City, Pampanga"
 },
 {
   value: "City of San Fernando, Pampanga",
   label: "City of San Fernando, Pampanga"
 },
 {
   value: "Apalit, Pampanga",
   label: "Apalit, Pampanga"
 },
 {
   value: "Arayat, Pampanga",
   label: "Arayat, Pampanga"
 },
 {
   value: "Bacolor, Pampanga",
   label: "Bacolor, Pampanga"
 },
 {
   value: "Candaba, Pampanga",
   label: "Candaba, Pampanga"
 },
 {
   value: "Floridablanca, Pampanga",
   label: "Floridablanca, Pampanga"
 },
 {
   value: "Guagua, Pampanga",
   label: "Guagua, Pampanga"
 },
 {
   value: "Lubao, Pampanga",
   label: "Lubao, Pampanga"
 },
 {
   value: "Mabalacat, Pampanga",
   label: "Mabalacat, Pampanga"
 },
 {
   value: "Macabebe, Pampanga",
   label: "Macabebe, Pampanga"
 },
 {
   value: "Magalang, Pampanga",
   label: "Magalang, Pampanga"
 },
 {
   value: "Masantol, Pampanga",
   label: "Masantol, Pampanga"
 },
 {
   value: "Mexico, Pampanga",
   label: "Mexico, Pampanga"
 },
 {
   value: "Minalin, Pampanga",
   label: "Minalin, Pampanga"
 },
 {
   value: "Porac, Pampanga",
   label: "Porac, Pampanga"
 },
 {
   value: "San Luis, Pampanga",
   label: "San Luis, Pampanga"
 },
 {
   value: "San Simon, Pampanga",
   label: "San Simon, Pampanga"
 },
 {
   value: "Santa Ana, Pampanga",
   label: "Santa Ana, Pampanga"
 },
 {
   value: "Santa Rita, Pampanga",
   label: "Santa Rita, Pampanga"
 },
 {
   value: "Santo Tomas, Pampanga",
   label: "Santo Tomas, Pampanga"
 },
 {
   value: "Sasmuan, Pampanga",
   label: "Sasmuan, Pampanga"
 },
 {
   value: "Alaminos City, Pangasinan",
   label: "Alaminos City, Pangasinan"
 },
 {
   value: "Dagupan City, Pangasinan",
   label: "Dagupan City, Pangasinan"
 },
 {
   value: "San Carlos City, Pangasinan",
   label: "San Carlos City, Pangasinan"
 },
 {
   value: "Urdaneta City, Pangasinan",
   label: "Urdaneta City, Pangasinan"
 },
 {
   value: "Agno, Pangasinan",
   label: "Agno, Pangasinan"
 },
 {
   value: "Aguilar, Pangasinan",
   label: "Aguilar, Pangasinan"
 },
 {
   value: "Alcala, Pangasinan",
   label: "Alcala, Pangasinan"
 },
 {
   value: "Anda, Pangasinan",
   label: "Anda, Pangasinan"
 },
 {
   value: "Asingan, Pangasinan",
   label: "Asingan, Pangasinan"
 },
 {
   value: "Balungao, Pangasinan",
   label: "Balungao, Pangasinan"
 },
 {
   value: "Bani, Pangasinan",
   label: "Bani, Pangasinan"
 },
 {
   value: "Basista, Pangasinan",
   label: "Basista, Pangasinan"
 },
 {
   value: "Bautista, Pangasinan",
   label: "Bautista, Pangasinan"
 },
 {
   value: "Bayambang, Pangasinan",
   label: "Bayambang, Pangasinan"
 },
 {
   value: "Binalonan, Pangasinan",
   label: "Binalonan, Pangasinan"
 },
 {
   value: "Binmaley, Pangasinan",
   label: "Binmaley, Pangasinan"
 },
 {
   value: "Bolinao, Pangasinan",
   label: "Bolinao, Pangasinan"
 },
 {
   value: "Bugallon, Pangasinan",
   label: "Bugallon, Pangasinan"
 },
 {
   value: "Burgos, Pangasinan",
   label: "Burgos, Pangasinan"
 },
 {
   value: "Calasiao, Pangasinan",
   label: "Calasiao, Pangasinan"
 },
 {
   value: "Dasol, Pangasinan",
   label: "Dasol, Pangasinan"
 },
 {
   value: "Infanta, Pangasinan",
   label: "Infanta, Pangasinan"
 },
 {
   value: "Labrador, Pangasinan",
   label: "Labrador, Pangasinan"
 },
 {
   value: "Laoac, Pangasinan",
   label: "Laoac, Pangasinan"
 },
 {
   value: "Lingayen, Pangasinan",
   label: "Lingayen, Pangasinan"
 },
 {
   value: "Mabini, Pangasinan",
   label: "Mabini, Pangasinan"
 },
 {
   value: "Malasiqui, Pangasinan",
   label: "Malasiqui, Pangasinan"
 },
 {
   value: "Manaoag, Pangasinan",
   label: "Manaoag, Pangasinan"
 },
 {
   value: "Mangaldan, Pangasinan",
   label: "Mangaldan, Pangasinan"
 },
 {
   value: "Mangatarem, Pangasinan",
   label: "Mangatarem, Pangasinan"
 },
 {
   value: "Mapandan, Pangasinan",
   label: "Mapandan, Pangasinan"
 },
 {
   value: "Natividad, Pangasinan",
   label: "Natividad, Pangasinan"
 },
 {
   value: "Pozzorubio, Pangasinan",
   label: "Pozzorubio, Pangasinan"
 },
 {
   value: "Rosales, Pangasinan",
   label: "Rosales, Pangasinan"
 },
 {
   value: "San Fabian, Pangasinan",
   label: "San Fabian, Pangasinan"
 },
 {
   value: "San Jacinto, Pangasinan",
   label: "San Jacinto, Pangasinan"
 },
 {
   value: "San Manuel, Pangasinan",
   label: "San Manuel, Pangasinan"
 },
 {
   value: "San Nicolas, Pangasinan",
   label: "San Nicolas, Pangasinan"
 },
 {
   value: "San Quintin, Pangasinan",
   label: "San Quintin, Pangasinan"
 },
 {
   value: "Santa Barbara, Pangasinan",
   label: "Santa Barbara, Pangasinan"
 },
 {
   value: "Santa Maria, Pangasinan",
   label: "Santa Maria, Pangasinan"
 },
 {
   value: "Santo Tomas, Pangasinan",
   label: "Santo Tomas, Pangasinan"
 },
 {
   value: "Sison, Pangasinan",
   label: "Sison, Pangasinan"
 },
 {
   value: "Sual, Pangasinan",
   label: "Sual, Pangasinan"
 },
 {
   value: "Tayug, Pangasinan",
   label: "Tayug, Pangasinan"
 },
 {
   value: "Umingan, Pangasinan",
   label: "Umingan, Pangasinan"
 },
 {
   value: "Urbiztondo, Pangasinan",
   label: "Urbiztondo, Pangasinan"
 },
 {
   value: "Villasis, Pangasinan",
   label: "Villasis, Pangasinan"
 },
 {
   value: "Lucena City, Quezon",
   label: "Lucena City, Quezon"
 },
 {
   value: "Tayabas City, Quezon",
   label: "Tayabas City, Quezon"
 },
 {
   value: "Agdangan, Quezon",
   label: "Agdangan, Quezon"
 },
 {
   value: "Alabat, Quezon",
   label: "Alabat, Quezon"
 },
 {
   value: "Atimonan, Quezon",
   label: "Atimonan, Quezon"
 },
 {
   value: "Buenavista, Quezon",
   label: "Buenavista, Quezon"
 },
 {
   value: "Burdeos, Quezon",
   label: "Burdeos, Quezon"
 },
 {
   value: "Calauag, Quezon",
   label: "Calauag, Quezon"
 },
 {
   value: "Candelaria, Quezon",
   label: "Candelaria, Quezon"
 },
 {
   value: "Catanauan, Quezon",
   label: "Catanauan, Quezon"
 },
 {
   value: "Dolores, Quezon",
   label: "Dolores, Quezon"
 },
 {
   value: "General Luna, Quezon",
   label: "General Luna, Quezon"
 },
 {
   value: "General Nakar, Quezon",
   label: "General Nakar, Quezon"
 },
 {
   value: "Guinayangan, Quezon",
   label: "Guinayangan, Quezon"
 },
 {
   value: "Gumaca, Quezon",
   label: "Gumaca, Quezon"
 },
 {
   value: "Infanta, Quezon",
   label: "Infanta, Quezon"
 },
 {
   value: "Jomalig, Quezon",
   label: "Jomalig, Quezon"
 },
 {
   value: "Lopez, Quezon",
   label: "Lopez, Quezon"
 },
 {
   value: "Lucban, Quezon",
   label: "Lucban, Quezon"
 },
 {
   value: "Macalelon, Quezon",
   label: "Macalelon, Quezon"
 },
 {
   value: "Mauban, Quezon",
   label: "Mauban, Quezon"
 },
 {
   value: "Mulanay, Quezon",
   label: "Mulanay, Quezon"
 },
 {
   value: "Padre Burgos, Quezon",
   label: "Padre Burgos, Quezon"
 },
 {
   value: "Pagbilao, Quezon",
   label: "Pagbilao, Quezon"
 },
 {
   value: "Panukulan, Quezon",
   label: "Panukulan, Quezon"
 },
 {
   value: "Patnanungan, Quezon",
   label: "Patnanungan, Quezon"
 },
 {
   value: "Perez, Quezon",
   label: "Perez, Quezon"
 },
 {
   value: "Pitogo, Quezon",
   label: "Pitogo, Quezon"
 },
 {
   value: "Plaridel, Quezon",
   label: "Plaridel, Quezon"
 },
 {
   value: "Polillo, Quezon",
   label: "Polillo, Quezon"
 },
 {
   value: "Quezon, Quezon",
   label: "Quezon, Quezon"
 },
 {
   value: "Real, Quezon",
   label: "Real, Quezon"
 },
 {
   value: "Sampaloc, Quezon",
   label: "Sampaloc, Quezon"
 },
 {
   value: "San Andres, Quezon",
   label: "San Andres, Quezon"
 },
 {
   value: "San Antonio, Quezon",
   label: "San Antonio, Quezon"
 },
 {
   value: "San Francisco, Quezon",
   label: "San Francisco, Quezon"
 },
 {
   value: "San Narciso, Quezon",
   label: "San Narciso, Quezon"
 },
 {
   value: "Sariaya, Quezon",
   label: "Sariaya, Quezon"
 },
 {
   value: "Tagkawayan, Quezon",
   label: "Tagkawayan, Quezon"
 },
 {
   value: "Tiaong, Quezon",
   label: "Tiaong, Quezon"
 },
 {
   value: "Unisan, Quezon",
   label: "Unisan, Quezon"
 },
 {
   value: "Aglipay, Quirino",
   label: "Aglipay, Quirino"
 },
 {
   value: "Cabarroguis, Quirino",
   label: "Cabarroguis, Quirino"
 },
 {
   value: "Diffun, Quirino",
   label: "Diffun, Quirino"
 },
 {
   value: "Maddela, Quirino",
   label: "Maddela, Quirino"
 },
 {
   value: "Nagtipunan, Quirino",
   label: "Nagtipunan, Quirino"
 },
 {
   value: "Saguday, Quirino",
   label: "Saguday, Quirino"
 },
 {
   value: "Antipolo City, Rizal",
   label: "Antipolo City, Rizal"
 },
 {
   value: "Angono, Rizal",
   label: "Angono, Rizal"
 },
 {
   value: "Baras, Rizal",
   label: "Baras, Rizal"
 },
 {
   value: "Binangonan, Rizal",
   label: "Binangonan, Rizal"
 },
 {
   value: "Cainta, Rizal",
   label: "Cainta, Rizal"
 },
 {
   value: "Cardona, Rizal",
   label: "Cardona, Rizal"
 },
 {
   value: "Jalajala, Rizal",
   label: "Jalajala, Rizal"
 },
 {
   value: "Morong, Rizal",
   label: "Morong, Rizal"
 },
 {
   value: "Pililla, Rizal",
   label: "Pililla, Rizal"
 },
 {
   value: "Rodriguez, Rizal",
   label: "Rodriguez, Rizal"
 },
 {
   value: "San Mateo, Rizal",
   label: "San Mateo, Rizal"
 },
 {
   value: "Tanay, Rizal",
   label: "Tanay, Rizal"
 },
 {
   value: "Taytay, Rizal",
   label: "Taytay, Rizal"
 },
 {
   value: "Teresa, Rizal",
   label: "Teresa, Rizal"
 },
 {
   value: "Alcantara, Romblon",
   label: "Alcantara, Romblon"
 },
 {
   value: "Banton, Romblon",
   label: "Banton, Romblon"
 },
 {
   value: "Cajidiocan, Romblon",
   label: "Cajidiocan, Romblon"
 },
 {
   value: "Calatrava, Romblon",
   label: "Calatrava, Romblon"
 },
 {
   value: "Concepcion, Romblon",
   label: "Concepcion, Romblon"
 },
 {
   value: "Corcuera, Romblon",
   label: "Corcuera, Romblon"
 },
 {
   value: "Ferrol, Romblon",
   label: "Ferrol, Romblon"
 },
 {
   value: "Looc, Romblon",
   label: "Looc, Romblon"
 },
 {
   value: "Magdiwang, Romblon",
   label: "Magdiwang, Romblon"
 },
 {
   value: "Odiongan, Romblon",
   label: "Odiongan, Romblon"
 },
 {
   value: "Romblon, Romblon",
   label: "Romblon, Romblon"
 },
 {
   value: "San Agustin, Romblon",
   label: "San Agustin, Romblon"
 },
 {
   value: "San Andres, Romblon",
   label: "San Andres, Romblon"
 },
 {
   value: "San Fernando, Romblon",
   label: "San Fernando, Romblon"
 },
 {
   value: "San Jose, Romblon",
   label: "San Jose, Romblon"
 },
 {
   value: "Santa Fe, Romblon",
   label: "Santa Fe, Romblon"
 },
 {
   value: "Santa Maria, Romblon",
   label: "Santa Maria, Romblon"
 },
 {
   value: "Calbayog City, Samar",
   label: "Calbayog City, Samar"
 },
 {
   value: "Catbalogan City, Samar",
   label: "Catbalogan City, Samar"
 },
 {
   value: "Almagro, Samar",
   label: "Almagro, Samar"
 },
 {
   value: "Basey, Samar",
   label: "Basey, Samar"
 },
 {
   value: "Calbiga, Samar",
   label: "Calbiga, Samar"
 },
 {
   value: "Daram, Samar",
   label: "Daram, Samar"
 },
 {
   value: "Gandara, Samar",
   label: "Gandara, Samar"
 },
 {
   value: "Hinabangan, Samar",
   label: "Hinabangan, Samar"
 },
 {
   value: "Jiabong, Samar",
   label: "Jiabong, Samar"
 },
 {
   value: "Marabut, Samar",
   label: "Marabut, Samar"
 },
 {
   value: "Matuguinao, Samar",
   label: "Matuguinao, Samar"
 },
 {
   value: "Motiong, Samar",
   label: "Motiong, Samar"
 },
 {
   value: "Pagsanghan, Samar",
   label: "Pagsanghan, Samar"
 },
 {
   value: "Paranas, Samar",
   label: "Paranas, Samar"
 },
 {
   value: "Pinabacdao, Samar",
   label: "Pinabacdao, Samar"
 },
 {
   value: "San Jorge, Samar",
   label: "San Jorge, Samar"
 },
 {
   value: "San Jose De Buan, Samar",
   label: "San Jose De Buan, Samar"
 },
 {
   value: "San Sebastian, Samar",
   label: "San Sebastian, Samar"
 },
 {
   value: "Santa Margarita, Samar",
   label: "Santa Margarita, Samar"
 },
 {
   value: "Santa Rita, Samar",
   label: "Santa Rita, Samar"
 },
 {
   value: "Santo Niño, Samar",
   label: "Santo Niño, Samar"
 },
 {
   value: "Tagapul-an, Samar",
   label: "Tagapul-an, Samar"
 },
 {
   value: "Talalora, Samar",
   label: "Talalora, Samar"
 },
 {
   value: "Tarangnan, Samar",
   label: "Tarangnan, Samar"
 },
 {
   value: "Villareal, Samar",
   label: "Villareal, Samar"
 },
 {
   value: "Zumarraga, Samar",
   label: "Zumarraga, Samar"
 },
 {
   value: "Alabel, Sarangani",
   label: "Alabel, Sarangani"
 },
 {
   value: "Glan, Sarangani",
   label: "Glan, Sarangani"
 },
 {
   value: "Kiamba, Sarangani",
   label: "Kiamba, Sarangani"
 },
 {
   value: "Maasim, Sarangani",
   label: "Maasim, Sarangani"
 },
 {
   value: "Maitum, Sarangani",
   label: "Maitum, Sarangani"
 },
 {
   value: "Malapatan, Sarangani",
   label: "Malapatan, Sarangani"
 },
 {
   value: "Malungon, Sarangani",
   label: "Malungon, Sarangani"
 },
 {
   value: "Enrique Villanueva, Siquijor",
   label: "Enrique Villanueva, Siquijor"
 },
 {
   value: "Larena, Siquijor",
   label: "Larena, Siquijor"
 },
 {
   value: "Lazi, Siquijor",
   label: "Lazi, Siquijor"
 },
 {
   value: "Maria, Siquijor",
   label: "Maria, Siquijor"
 },
 {
   value: "San Juan, Siquijor",
   label: "San Juan, Siquijor"
 },
 {
   value: "Siquijor, Siquijor",
   label: "Siquijor, Siquijor"
 },
 {
   value: "Sorsogon City, Sorsogon",
   label: "Sorsogon City, Sorsogon"
 },
 {
   value: "Barcelona, Sorsogon",
   label: "Barcelona, Sorsogon"
 },
 {
   value: "Bulan, Sorsogon",
   label: "Bulan, Sorsogon"
 },
 {
   value: "Bulusan, Sorsogon",
   label: "Bulusan, Sorsogon"
 },
 {
   value: "Casiguran, Sorsogon",
   label: "Casiguran, Sorsogon"
 },
 {
   value: "Castilla, Sorsogon",
   label: "Castilla, Sorsogon"
 },
 {
   value: "Donsol, Sorsogon",
   label: "Donsol, Sorsogon"
 },
 {
   value: "Gubat, Sorsogon",
   label: "Gubat, Sorsogon"
 },
 {
   value: "Irosin, Sorsogon",
   label: "Irosin, Sorsogon"
 },
 {
   value: "Juban, Sorsogon",
   label: "Juban, Sorsogon"
 },
 {
   value: "Magallanes, Sorsogon",
   label: "Magallanes, Sorsogon"
 },
 {
   value: "Matnog, Sorsogon",
   label: "Matnog, Sorsogon"
 },
 {
   value: "Pilar, Sorsogon",
   label: "Pilar, Sorsogon"
 },
 {
   value: "Prieto Diaz, Sorsogon",
   label: "Prieto Diaz, Sorsogon"
 },
 {
   value: "Santa Magdalena, Sorsogon",
   label: "Santa Magdalena, Sorsogon"
 },
 {
   value: "General Santos City, South Cotabato",
   label: "General Santos City, South Cotabato"
 },
 {
   value: "Koronadal City, South Cotabato",
   label: "Koronadal City, South Cotabato"
 },
 {
   value: "Banga, South Cotabato",
   label: "Banga, South Cotabato"
 },
 {
   value: "Lake Sebu, South Cotabato",
   label: "Lake Sebu, South Cotabato"
 },
 {
   value: "Norala, South Cotabato",
   label: "Norala, South Cotabato"
 },
 {
   value: "Polomolok, South Cotabato",
   label: "Polomolok, South Cotabato"
 },
 {
   value: "Santo Niño, South Cotabato",
   label: "Santo Niño, South Cotabato"
 },
 {
   value: "Surallah, South Cotabato",
   label: "Surallah, South Cotabato"
 },
 {
   value: "T'boli, South Cotabato",
   label: "T'boli, South Cotabato"
 },
 {
   value: "Tampakan, South Cotabato",
   label: "Tampakan, South Cotabato"
 },
 {
   value: "Tantangan, South Cotabato",
   label: "Tantangan, South Cotabato"
 },
 {
   value: "Tupi, South Cotabato",
   label: "Tupi, South Cotabato"
 },
 {
   value: "Maasin City, Southern Leyte",
   label: "Maasin City, Southern Leyte"
 },
 {
   value: "Anahawan, Southern Leyte",
   label: "Anahawan, Southern Leyte"
 },
 {
   value: "Bontoc, Southern Leyte",
   label: "Bontoc, Southern Leyte"
 },
 {
   value: "Hinunangan, Southern Leyte",
   label: "Hinunangan, Southern Leyte"
 },
 {
   value: "Hinundayan, Southern Leyte",
   label: "Hinundayan, Southern Leyte"
 },
 {
   value: "Libagon, Southern Leyte",
   label: "Libagon, Southern Leyte"
 },
 {
   value: "Liloan, Southern Leyte",
   label: "Liloan, Southern Leyte"
 },
 {
   value: "Limasawa, Southern Leyte",
   label: "Limasawa, Southern Leyte"
 },
 {
   value: "Macrohon, Southern Leyte",
   label: "Macrohon, Southern Leyte"
 },
 {
   value: "Malitbog, Southern Leyte",
   label: "Malitbog, Southern Leyte"
 },
 {
   value: "Padre Burgos, Southern Leyte",
   label: "Padre Burgos, Southern Leyte"
 },
 {
   value: "Pintuyan, Southern Leyte",
   label: "Pintuyan, Southern Leyte"
 },
 {
   value: "Saint Bernard, Southern Leyte",
   label: "Saint Bernard, Southern Leyte"
 },
 {
   value: "San Francisco, Southern Leyte",
   label: "San Francisco, Southern Leyte"
 },
 {
   value: "San Juan, Southern Leyte",
   label: "San Juan, Southern Leyte"
 },
 {
   value: "San Ricardo, Southern Leyte",
   label: "San Ricardo, Southern Leyte"
 },
 {
   value: "Silago, Southern Leyte",
   label: "Silago, Southern Leyte"
 },
 {
   value: "Sogod, Southern Leyte",
   label: "Sogod, Southern Leyte"
 },
 {
   value: "Tomas Oppus, Southern Leyte",
   label: "Tomas Oppus, Southern Leyte"
 },
 {
   value: "Tacurong City, Sultan Kudarat",
   label: "Tacurong City, Sultan Kudarat"
 },
 {
   value: "Bagumbayan, Sultan Kudarat",
   label: "Bagumbayan, Sultan Kudarat"
 },
 {
   value: "Columbio, Sultan Kudarat",
   label: "Columbio, Sultan Kudarat"
 },
 {
   value: "Esperanza, Sultan Kudarat",
   label: "Esperanza, Sultan Kudarat"
 },
 {
   value: "Isulan, Sultan Kudarat",
   label: "Isulan, Sultan Kudarat"
 },
 {
   value: "Kalamansig, Sultan Kudarat",
   label: "Kalamansig, Sultan Kudarat"
 },
 {
   value: "Lambayong, Sultan Kudarat",
   label: "Lambayong, Sultan Kudarat"
 },
 {
   value: "Lebak, Sultan Kudarat",
   label: "Lebak, Sultan Kudarat"
 },
 {
   value: "Lutayan, Sultan Kudarat",
   label: "Lutayan, Sultan Kudarat"
 },
 {
   value: "Palimbang, Sultan Kudarat",
   label: "Palimbang, Sultan Kudarat"
 },
 {
   value: "President Quirino, Sultan Kudarat",
   label: "President Quirino, Sultan Kudarat"
 },
 {
   value: "Senator Ninoy Aquino, Sultan Kudarat",
   label: "Senator Ninoy Aquino, Sultan Kudarat"
 },
 {
   value: "Banguingui, Sulu",
   label: "Banguingui, Sulu"
 },
 {
   value: "Hadji Panglima Tahil, Sulu",
   label: "Hadji Panglima Tahil, Sulu"
 },
 {
   value: "Indanan, Sulu",
   label: "Indanan, Sulu"
 },
 {
   value: "Jolo, Sulu",
   label: "Jolo, Sulu"
 },
 {
   value: "Kalingalan Caluang, Sulu",
   label: "Kalingalan Caluang, Sulu"
 },
 {
   value: "Lugus, Sulu",
   label: "Lugus, Sulu"
 },
 {
   value: "Luuk, Sulu",
   label: "Luuk, Sulu"
 },
 {
   value: "Maimbung, Sulu",
   label: "Maimbung, Sulu"
 },
 {
   value: "Old Panamao, Sulu",
   label: "Old Panamao, Sulu"
 },
 {
   value: "Omar, Sulu",
   label: "Omar, Sulu"
 },
 {
   value: "Pandami, Sulu",
   label: "Pandami, Sulu"
 },
 {
   value: "Panglima Estino, Sulu",
   label: "Panglima Estino, Sulu"
 },
 {
   value: "Pangutaran, Sulu",
   label: "Pangutaran, Sulu"
 },
 {
   value: "Parang, Sulu",
   label: "Parang, Sulu"
 },
 {
   value: "Pata, Sulu",
   label: "Pata, Sulu"
 },
 {
   value: "Patikul, Sulu",
   label: "Patikul, Sulu"
 },
 {
   value: "Siasi, Sulu",
   label: "Siasi, Sulu"
 },
 {
   value: "Talipao, Sulu",
   label: "Talipao, Sulu"
 },
 {
   value: "Tapul, Sulu",
   label: "Tapul, Sulu"
 },
 {
   value: "Surigao City, Surigao del Norte",
   label: "Surigao City, Surigao del Norte"
 },
 {
   value: "Alegria, Surigao del Norte",
   label: "Alegria, Surigao del Norte"
 },
 {
   value: "Bacuag, Surigao del Norte",
   label: "Bacuag, Surigao del Norte"
 },
 {
   value: "Basilisa, Surigao del Norte",
   label: "Basilisa, Surigao del Norte"
 },
 {
   value: "Burgos, Surigao del Norte",
   label: "Burgos, Surigao del Norte"
 },
 {
   value: "Cagdianao, Surigao del Norte",
   label: "Cagdianao, Surigao del Norte"
 },
 {
   value: "Claver, Surigao del Norte",
   label: "Claver, Surigao del Norte"
 },
 {
   value: "Dapa, Surigao del Norte",
   label: "Dapa, Surigao del Norte"
 },
 {
   value: "Del Carmen, Surigao del Norte",
   label: "Del Carmen, Surigao del Norte"
 },
 {
   value: "Dinagat, Surigao del Norte",
   label: "Dinagat, Surigao del Norte"
 },
 {
   value: "General Luna, Surigao del Norte",
   label: "General Luna, Surigao del Norte"
 },
 {
   value: "Gigaquit, Surigao del Norte",
   label: "Gigaquit, Surigao del Norte"
 },
 {
   value: "Libjo, Surigao del Norte",
   label: "Libjo, Surigao del Norte"
 },
 {
   value: "Loreto, Surigao del Norte",
   label: "Loreto, Surigao del Norte"
 },
 {
   value: "Mainit, Surigao del Norte",
   label: "Mainit, Surigao del Norte"
 },
 {
   value: "Malimono, Surigao del Norte",
   label: "Malimono, Surigao del Norte"
 },
 {
   value: "Pilar, Surigao del Norte",
   label: "Pilar, Surigao del Norte"
 },
 {
   value: "Placer, Surigao del Norte",
   label: "Placer, Surigao del Norte"
 },
 {
   value: "San Benito, Surigao del Norte",
   label: "San Benito, Surigao del Norte"
 },
 {
   value: "San Francisco, Surigao del Norte",
   label: "San Francisco, Surigao del Norte"
 },
 {
   value: "San Isidro, Surigao del Norte",
   label: "San Isidro, Surigao del Norte"
 },
 {
   value: "San Jose, Surigao del Norte",
   label: "San Jose, Surigao del Norte"
 },
 {
   value: "Santa Monica, Surigao del Norte",
   label: "Santa Monica, Surigao del Norte"
 },
 {
   value: "Sison, Surigao del Norte",
   label: "Sison, Surigao del Norte"
 },
 {
   value: "Socorro, Surigao del Norte",
   label: "Socorro, Surigao del Norte"
 },
 {
   value: "Tagana-an, Surigao del Norte",
   label: "Tagana-an, Surigao del Norte"
 },
 {
   value: "Tubajon, Surigao del Norte",
   label: "Tubajon, Surigao del Norte"
 },
 {
   value: "Tubod, Surigao del Norte",
   label: "Tubod, Surigao del Norte"
 },
 {
   value: "Bislig City, Surigao del Sur",
   label: "Bislig City, Surigao del Sur"
 },
 {
   value: "Tandag City, Surigao del Sur",
   label: "Tandag City, Surigao del Sur"
 },
 {
   value: "Barobo, Surigao del Sur",
   label: "Barobo, Surigao del Sur"
 },
 {
   value: "Bayabas, Surigao del Sur",
   label: "Bayabas, Surigao del Sur"
 },
 {
   value: "Cagwait, Surigao del Sur",
   label: "Cagwait, Surigao del Sur"
 },
 {
   value: "Cantilan, Surigao del Sur",
   label: "Cantilan, Surigao del Sur"
 },
 {
   value: "Carmen, Surigao del Sur",
   label: "Carmen, Surigao del Sur"
 },
 {
   value: "Carrascal, Surigao del Sur",
   label: "Carrascal, Surigao del Sur"
 },
 {
   value: "Cortes, Surigao del Sur",
   label: "Cortes, Surigao del Sur"
 },
 {
   value: "Hinatuan, Surigao del Sur",
   label: "Hinatuan, Surigao del Sur"
 },
 {
   value: "Lanuza, Surigao del Sur",
   label: "Lanuza, Surigao del Sur"
 },
 {
   value: "Lianga, Surigao del Sur",
   label: "Lianga, Surigao del Sur"
 },
 {
   value: "Lingig, Surigao del Sur",
   label: "Lingig, Surigao del Sur"
 },
 {
   value: "Madrid, Surigao del Sur",
   label: "Madrid, Surigao del Sur"
 },
 {
   value: "Marihatag, Surigao del Sur",
   label: "Marihatag, Surigao del Sur"
 },
 {
   value: "San Agustin, Surigao del Sur",
   label: "San Agustin, Surigao del Sur"
 },
 {
   value: "San Miguel, Surigao del Sur",
   label: "San Miguel, Surigao del Sur"
 },
 {
   value: "Tagbina, Surigao del Sur",
   label: "Tagbina, Surigao del Sur"
 },
 {
   value: "Tago, Surigao del Sur",
   label: "Tago, Surigao del Sur"
 },
 {
   value: "Tarlac City, Tarlac",
   label: "Tarlac City, Tarlac"
 },
 {
   value: "Anao, Tarlac",
   label: "Anao, Tarlac"
 },
 {
   value: "Bamban, Tarlac",
   label: "Bamban, Tarlac"
 },
 {
   value: "Camiling, Tarlac",
   label: "Camiling, Tarlac"
 },
 {
   value: "Capas, Tarlac",
   label: "Capas, Tarlac"
 },
 {
   value: "Concepcion, Tarlac",
   label: "Concepcion, Tarlac"
 },
 {
   value: "Gerona, Tarlac",
   label: "Gerona, Tarlac"
 },
 {
   value: "La Paz, Tarlac",
   label: "La Paz, Tarlac"
 },
 {
   value: "Mayantoc, Tarlac",
   label: "Mayantoc, Tarlac"
 },
 {
   value: "Moncada, Tarlac",
   label: "Moncada, Tarlac"
 },
 {
   value: "Paniqui, Tarlac",
   label: "Paniqui, Tarlac"
 },
 {
   value: "Pura, Tarlac",
   label: "Pura, Tarlac"
 },
 {
   value: "Ramos, Tarlac",
   label: "Ramos, Tarlac"
 },
 {
   value: "San Clemente, Tarlac",
   label: "San Clemente, Tarlac"
 },
 {
   value: "San Jose, Tarlac",
   label: "San Jose, Tarlac"
 },
 {
   value: "San Manuel, Tarlac",
   label: "San Manuel, Tarlac"
 },
 {
   value: "Santa Ignacia, Tarlac",
   label: "Santa Ignacia, Tarlac"
 },
 {
   value: "Victoria, Tarlac",
   label: "Victoria, Tarlac"
 },
 {
   value: "Bongao, Tawi-Tawi",
   label: "Bongao, Tawi-Tawi"
 },
 {
   value: "Languyan, Tawi-Tawi",
   label: "Languyan, Tawi-Tawi"
 },
 {
   value: "Mapun, Tawi-Tawi",
   label: "Mapun, Tawi-Tawi"
 },
 {
   value: "Panglima Sugala, Tawi-Tawi",
   label: "Panglima Sugala, Tawi-Tawi"
 },
 {
   value: "Sapa-Sapa, Tawi-Tawi",
   label: "Sapa-Sapa, Tawi-Tawi"
 },
 {
   value: "Sibutu, Tawi-Tawi",
   label: "Sibutu, Tawi-Tawi"
 },
 {
   value: "Simunul, Tawi-Tawi",
   label: "Simunul, Tawi-Tawi"
 },
 {
   value: "Sitangkai, Tawi-Tawi",
   label: "Sitangkai, Tawi-Tawi"
 },
 {
   value: "South Ubian, Tawi-Tawi",
   label: "South Ubian, Tawi-Tawi"
 },
 {
   value: "Tandubas, Tawi-Tawi",
   label: "Tandubas, Tawi-Tawi"
 },
 {
   value: "Turtle Islands, Tawi-Tawi",
   label: "Turtle Islands, Tawi-Tawi"
 },
 {
   value: "Olongapo City, Zambales",
   label: "Olongapo City, Zambales"
 },
 {
   value: "Botolan, Zambales",
   label: "Botolan, Zambales"
 },
 {
   value: "Cabangan, Zambales",
   label: "Cabangan, Zambales"
 },
 {
   value: "Candelaria, Zambales",
   label: "Candelaria, Zambales"
 },
 {
   value: "Castillejos, Zambales",
   label: "Castillejos, Zambales"
 },
 {
   value: "Iba, Zambales",
   label: "Iba, Zambales"
 },
 {
   value: "Masinloc, Zambales",
   label: "Masinloc, Zambales"
 },
 {
   value: "Palauig, Zambales",
   label: "Palauig, Zambales"
 },
 {
   value: "San Antonio, Zambales",
   label: "San Antonio, Zambales"
 },
 {
   value: "San Felipe, Zambales",
   label: "San Felipe, Zambales"
 },
 {
   value: "San Marcelino, Zambales",
   label: "San Marcelino, Zambales"
 },
 {
   value: "San Narciso, Zambales",
   label: "San Narciso, Zambales"
 },
 {
   value: "Santa Cruz, Zambales",
   label: "Santa Cruz, Zambales"
 },
 {
   value: "Subic, Zambales",
   label: "Subic, Zambales"
 },
 {
   value: "Dapitan City, Zamboanga del Norte",
   label: "Dapitan City, Zamboanga del Norte"
 },
 {
   value: "Dipolog City, Zamboanga del Norte",
   label: "Dipolog City, Zamboanga del Norte"
 },
 {
   value: "Bacungan, Zamboanga del Norte",
   label: "Bacungan, Zamboanga del Norte"
 },
 {
   value: "Baliguian, Zamboanga del Norte",
   label: "Baliguian, Zamboanga del Norte"
 },
 {
   value: "Godod, Zamboanga del Norte",
   label: "Godod, Zamboanga del Norte"
 },
 {
   value: "Gutalac, Zamboanga del Norte",
   label: "Gutalac, Zamboanga del Norte"
 },
 {
   value: "Jose Dalman, Zamboanga del Norte",
   label: "Jose Dalman, Zamboanga del Norte"
 },
 {
   value: "Kalawit, Zamboanga del Norte",
   label: "Kalawit, Zamboanga del Norte"
 },
 {
   value: "Katipunan, Zamboanga del Norte",
   label: "Katipunan, Zamboanga del Norte"
 },
 {
   value: "La Libertad, Zamboanga del Norte",
   label: "La Libertad, Zamboanga del Norte"
 },
 {
   value: "Labason, Zamboanga del Norte",
   label: "Labason, Zamboanga del Norte"
 },
 {
   value: "Liloy, Zamboanga del Norte",
   label: "Liloy, Zamboanga del Norte"
 },
 {
   value: "Manukan, Zamboanga del Norte",
   label: "Manukan, Zamboanga del Norte"
 },
 {
   value: "Mutia, Zamboanga del Norte",
   label: "Mutia, Zamboanga del Norte"
 },
 {
   value: "Piñan, Zamboanga del Norte",
   label: "Piñan, Zamboanga del Norte"
 },
 {
   value: "Polanco, Zamboanga del Norte",
   label: "Polanco, Zamboanga del Norte"
 },
 {
   value: "President Manuel A. Roxas, Zamboanga del Norte",
   label: "President Manuel A. Roxas, Zamboanga del Norte"
 },
 {
   value: "Rizal, Zamboanga del Norte",
   label: "Rizal, Zamboanga del Norte"
 },
 {
   value: "Salug, Zamboanga del Norte",
   label: "Salug, Zamboanga del Norte"
 },
 {
   value: "Sergio Osmeña Sr., Zamboanga del Norte",
   label: "Sergio Osmeña Sr., Zamboanga del Norte"
 },
 {
   value: "Siayan, Zamboanga del Norte",
   label: "Siayan, Zamboanga del Norte"
 },
 {
   value: "Sibuco, Zamboanga del Norte",
   label: "Sibuco, Zamboanga del Norte"
 },
 {
   value: "Sibutad, Zamboanga del Norte",
   label: "Sibutad, Zamboanga del Norte"
 },
 {
   value: "Sindangan, Zamboanga del Norte",
   label: "Sindangan, Zamboanga del Norte"
 },
 {
   value: "Siocon, Zamboanga del Norte",
   label: "Siocon, Zamboanga del Norte"
 },
 {
   value: "Sirawai, Zamboanga del Norte",
   label: "Sirawai, Zamboanga del Norte"
 },
 {
   value: "Tampilisan, Zamboanga del Norte",
   label: "Tampilisan, Zamboanga del Norte"
 },
 {
   value: "Pagadian City, Zamboanga del Sur",
   label: "Pagadian City, Zamboanga del Sur"
 },
 {
   value: "Zamboanga City, Zamboanga del Sur",
   label: "Zamboanga City, Zamboanga del Sur"
 },
 {
   value: "Aurora, Zamboanga del Sur",
   label: "Aurora, Zamboanga del Sur"
 },
 {
   value: "Bayog, Zamboanga del Sur",
   label: "Bayog, Zamboanga del Sur"
 },
 {
   value: "Dimataling, Zamboanga del Sur",
   label: "Dimataling, Zamboanga del Sur"
 },
 {
   value: "Dinas, Zamboanga del Sur",
   label: "Dinas, Zamboanga del Sur"
 },
 {
   value: "Dumalinao, Zamboanga del Sur",
   label: "Dumalinao, Zamboanga del Sur"
 },
 {
   value: "Dumingag, Zamboanga del Sur",
   label: "Dumingag, Zamboanga del Sur"
 },
 {
   value: "Guipos, Zamboanga del Sur",
   label: "Guipos, Zamboanga del Sur"
 },
 {
   value: "Josefina, Zamboanga del Sur",
   label: "Josefina, Zamboanga del Sur"
 },
 {
   value: "Kumalarang, Zamboanga del Sur",
   label: "Kumalarang, Zamboanga del Sur"
 },
 {
   value: "Labangan, Zamboanga del Sur",
   label: "Labangan, Zamboanga del Sur"
 },
 {
   value: "Lakewood, Zamboanga del Sur",
   label: "Lakewood, Zamboanga del Sur"
 },
 {
   value: "Lapuyan, Zamboanga del Sur",
   label: "Lapuyan, Zamboanga del Sur"
 },
 {
   value: "Mahayag, Zamboanga del Sur",
   label: "Mahayag, Zamboanga del Sur"
 },
 {
   value: "Margosatubig, Zamboanga del Sur",
   label: "Margosatubig, Zamboanga del Sur"
 },
 {
   value: "Midsalip, Zamboanga del Sur",
   label: "Midsalip, Zamboanga del Sur"
 },
 {
   value: "Molave, Zamboanga del Sur",
   label: "Molave, Zamboanga del Sur"
 },
 {
   value: "Pitogo, Zamboanga del Sur",
   label: "Pitogo, Zamboanga del Sur"
 },
 {
   value: "Ramon Magsaysay, Zamboanga del Sur",
   label: "Ramon Magsaysay, Zamboanga del Sur"
 },
 {
   value: "San Miguel, Zamboanga del Sur",
   label: "San Miguel, Zamboanga del Sur"
 },
 {
   value: "San Pablo, Zamboanga del Sur",
   label: "San Pablo, Zamboanga del Sur"
 },
 {
   value: "Sominot, Zamboanga del Sur",
   label: "Sominot, Zamboanga del Sur"
 },
 {
   value: "Tabina, Zamboanga del Sur",
   label: "Tabina, Zamboanga del Sur"
 },
 {
   value: "Tambulig, Zamboanga del Sur",
   label: "Tambulig, Zamboanga del Sur"
 },
 {
   value: "Tigbao, Zamboanga del Sur",
   label: "Tigbao, Zamboanga del Sur"
 },
 {
   value: "Tukuran, Zamboanga del Sur",
   label: "Tukuran, Zamboanga del Sur"
 },
 {
   value: "Vincenzo A. Sagun, Zamboanga del Sur",
   label: "Vincenzo A. Sagun, Zamboanga del Sur"
 },
 {
   value: "Alicia, Zamboanga Sibugay",
   label: "Alicia, Zamboanga Sibugay"
 },
 {
   value: "Buug, Zamboanga Sibugay",
   label: "Buug, Zamboanga Sibugay"
 },
 {
   value: "Diplahan, Zamboanga Sibugay",
   label: "Diplahan, Zamboanga Sibugay"
 },
 {
   value: "Imelda, Zamboanga Sibugay",
   label: "Imelda, Zamboanga Sibugay"
 },
 {
   value: "Ipil, Zamboanga Sibugay",
   label: "Ipil, Zamboanga Sibugay"
 },
 {
   value: "Kabasalan, Zamboanga Sibugay",
   label: "Kabasalan, Zamboanga Sibugay"
 },
 {
   value: "Mabuhay, Zamboanga Sibugay",
   label: "Mabuhay, Zamboanga Sibugay"
 },
 {
   value: "Malangas, Zamboanga Sibugay",
   label: "Malangas, Zamboanga Sibugay"
 },
 {
   value: "Naga, Zamboanga Sibugay",
   label: "Naga, Zamboanga Sibugay"
 },
 {
   value: "Olutanga, Zamboanga Sibugay",
   label: "Olutanga, Zamboanga Sibugay"
 },
 {
   value: "Payao, Zamboanga Sibugay",
   label: "Payao, Zamboanga Sibugay"
 },
 {
   value: "Roseller Lim, Zamboanga Sibugay",
   label: "Roseller Lim, Zamboanga Sibugay"
 },
 {
   value: "Siay, Zamboanga Sibugay",
   label: "Siay, Zamboanga Sibugay"
 },
 {
   value: "Talusan, Zamboanga Sibugay",
   label: "Talusan, Zamboanga Sibugay"
 },
 {
   value: "Titay, Zamboanga Sibugay",
   label: "Titay, Zamboanga Sibugay"
 },
 {
   value: "Tungawan, Zamboanga Sibugay",
   label: "Tungawan, Zamboanga Sibugay"
 }
];

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        featured_room: [],
        guest: "", 
        check_out: "", 
        check_in: "", 
        address: "",
        signup_cpassword: "",
        signup_password: "",
        signup_username: "",
        selectedOption: null,
        open: false,
        openSignup: false,
        openLogin: false,
        password: "",
        username: "",
        userlocal: "",
    };
    this.select = this.select.bind(this);
  }

  componentDidMount() {


    this.setState({userlocal: localStorage.getItem('user_id')})

     const hotel = { 
        val: "project=60641fde66ceb2089b1bc468",
       }
  
  
  axios.post('http://localhost:5000/room_type/random', hotel)
  .then(res => {
  console.log('response: ', res.data)
  this.setState({ featured_room: res.data })
  })
  .catch((error) => {
   console.log(error);
  })
   
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption.value)
    );
  };

  select= event => {

    this.setState({
		[event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    const { selectedOption, check_in, check_out, guest } = this.state;
	console.log('selectedOption submit: ', this.state.selectedOption)
if( guest !== "" && check_out!== "" && check_in!== "" && selectedOption.value!== ""){
	this.props.history.push('/Search_page/'+check_in+'/'+check_out+'/'+guest+'/'+selectedOption.value )
}
   else{
	console.log("Please Complete the fields");
   }
};


currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 handleOpen = () => {

  this.setState({open:true});
};

 handleClose = () => {
  this.setState({open: false});
};

handleOpenSignup = () => {

  this.setState({openSignup:true});
};

handleCloseSignup = () => {
  this.setState({openSignup: false});
};


signup = () => {

  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var regex = /^[0-9a-zA-Z\_]+$/


console.log('regex.test(fn)length: ', this.state.signup_password.length)
if(mailformat.test(this.state.signup_username) === false){
  cogoToast.error(
    <div style={{marginTop: '25%'}}>
<b>Sorry. Change Your Email</b>
<div>Invalid Email Address</div>
</div>, { position: 'top-center'}
    );
    return;
}
if(regex.test(this.state.signup_password) === false){
  cogoToast.error(
    <div style={{marginTop: '25%'}}>
<b>Sorry. Change Your Password</b>
<div>Please Avoid Using Special Characters</div>
</div>, { position: 'top-center'}
    );
    return;
}
if(!this.state.signup_password.length > 7){
  cogoToast.error(
    <div style={{marginTop: '25%'}}>
<b>Sorry, Please Check Password</b>
<div>Minimum of 8 Characters</div>
</div>, { position: 'top-center'}
    );
    return;
}

  if(!this.state.signup_password.trim() || this.state.signup_password !== this.state.signup_cpassword){
    cogoToast.error(
      <div style={{marginTop: '25%'}}>
<b>Please Match the Password</b>
<div>Password and Confirm</div>
</div>, { position: 'top-center'}
      );
      return;
  }
  const hotel = { 
 //   signup_cpassword: "",
 createdAt:moment().unix(),
 temp_id: this.state.signup_username+Math.floor(Math.random() * 9999)+moment().unix(),
    signup_password: this.state.signup_password,
    signup_username: this.state.signup_username,
   }


axios.post('http://localhost:5000/guest_account/signup_guest_account', hotel)
.then(res => {
console.log('response: ', res.data)
if(res.data === 'Successfully Registered'){
  localStorage.setItem('user_id', hotel.temp_id)
  this.props.history.push('/Update_Info')
}
if(res.data === 'User already exists'){
    cogoToast.error(
        <div style={{marginTop: '25%'}}>
<b>Choose ther Email</b>
<div>User already exists</div>
</div>, { position: 'top-center'}
        );
       
}
else{
  cogoToast.error(
    <div style={{marginTop: '25%'}}>
<b>Sorry Please Try Again...</b>
<div>Try To Refresh The Page</div>
</div>, { position: 'top-center'}
    );
}
//this.setState({ featured_room: res.data })
//localStorage.setItem('user_id', hotel.temp_id)
//this.props.history.push('/Update_Info')
})
.catch((error) => {
console.log(error);
})
};



Onlogin = () => {
  const hotel = { 
    password: this.state.signup_password,
    username: this.state.signup_username,
   }


axios.post('http://localhost:5000/guest_account/login_guest_account', hotel)
.then(res => {

if(res.data === 'Incorrect Email or Password'){
  cogoToast.error(
      <div style={{marginTop: '25%'}}>
<b>Check Your Email and Password</b>
<div>Incorrect Email or Password</div>
</div>, { position: 'top-center'}
      );
      return;
}
else{
  localStorage.setItem('user_id', res.data.temp_id)
this.props.history.push('/Update_Info')
}

//this.setState({ featured_room: res.data })
})
.catch((error) => {
console.log(error);
})
};
select= event => {

  this.setState({
  [event.target.name]: event.target.value
  })
}


  
logout = () => {
  confirmAlert({
    title: 'Logout ',
    message: 'Are you sure to do this?',
    buttons: [
      {
        label: 'Yes',
        onClick: () =>
        {
  localStorage.removeItem('user_id')
  window.location.reload(); 

        }

      },
      {
        label: 'No',
        onClick: () => console.log('no')
      }
    ]
  });

}


  render() {
    const { selectedOption } = this.state;
    const search = window.location.search;
const params = new URLSearchParams(search);
const foo = params.get('rate_mode');
const roomprice = params.get('room');
console.log('rate_mode: ', this.props.location.search)
console.log('search: ', search)
console.log('params: ', params)
console.log('foo: ', foo)
console.log('roomprice: ', roomprice)


    console.log('userlocal: ', this.state.userlocal)
    return (
      
<body>

  
<Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.open}>

        {this.state.openSignup === false?    <div style={{ backgroundColor: 'white',
    border: '2px solid #000',
    padding:40,
  width: '40%',
  marginTop: '10%',
marginLeft: '30%'
    
    }} class="col-xl-12">
        <p  style={{fontSize: '15px'}}>Email</p>
        <TextField label="Email" variant="outlined" style={{width: '100%'}} name="signup_username" onChange={this.select} />
        <p  style={{fontSize: '15px'}}>Password</p>
        <TextField label="Password" variant="outlined" style={{width: '100%'}} name="signup_password" onChange={this.select} />
        <br /><br />
     
        <p style={{fontSize: '15px'}}>Don’t have an account? <a onClick={this.handleOpenSignup} style={{color: 'blue', textDecoration: 'underline'}}>Sign up</a></p>
     <div style={{alignSelf: 'center'}}>
                                        <button type="submit" className="form-control btn btn-primary" onClick={this.Onlogin} >Login</button>
           </div>   
          
          
           


        </div>
:
<div style={{ backgroundColor: 'white',
border: '2px solid #000',
padding:40,
width: '40%',
marginTop: '10%',
marginLeft: '30%'

}} class="col-xl-12">
    <p  style={{fontSize: '15px'}}>Email</p>
    <TextField label="Email" variant="outlined" style={{width: '100%'}} name="signup_username" onChange={this.select} />
    <p  style={{fontSize: '15px'}}>Password</p>
    <TextField label="Password" variant="outlined" style={{width: '100%'}} name="signup_password" minlength="8" onChange={this.select} />

   <p  style={{fontSize: '15px'}}>Confirm Password</p>
    <TextField label="Confirm Password" variant="outlined" style={{width: '100%'}} name="signup_cpassword" onChange={this.select} />

     
    <br /><br />
  
       
       <p style={{fontSize: '15px'}}>Have an account? <a onClick={this.handleCloseSignup} style={{color: 'blue', textDecoration: 'underline'}}>Login</a></p>
    <div style={{alignSelf: 'center'}}>
                                       <button type="submit" className="form-control btn btn-primary" onClick={this.signup} >Sign Up</button>
          </div>   
 

    </div>

}


        

        </Fade>
      </Modal>

<div class="tm-main-content" id="top">
          
            <div class="tm-top-bar" id="tm-top-bar">
                <div class="container">
                    <div class="row">
                        
                        <nav class="navbar navbar-expand-lg narbar-light">
                            <Link to={'/Home'} class="navbar-brand mr-auto" href="#">
                                <img src="img/logo.png" alt="Site logo" style={{marginTop: -20}}/>
                                Gloreto
                            </Link>
                           
                            <div id="mainNav" class="collapse navbar-collapse tm-bg-white">
                                <ul class="navbar-nav ml-auto">
                                  <li class="nav-item">
                                  <Link to={'/Home'}>
                                    <a class="nav-link" href="#top">Home <span class="sr-only">(current)</span></a>
                                    </Link>
                                  </li>
                                
                                  <li class="nav-item">
                                      <Link to={'/Check_reservation'}>
                                    <a class="nav-link" href="#tm-section-5">Check Reservation</a>
                                    </Link>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link" href="#tm-section-6">Contact Us</a>
                                  </li>
                                  {this.state.userlocal === null || this.state.userlocal === undefined? null:
                                     <li class="nav-item">
                                     <Link to={'/Update_Info'}>
                                <a class="nav-link">Profile</a>
                                </Link>
                              </li>
                                  }
                                   {this.state.userlocal === null || this.state.userlocal === undefined? null:
                                     <li class="nav-item">
                                     <Link to={'/Booking'}>
                                <a class="nav-link">Bookings</a>
                                </Link>
                              </li>
                                  }
                                   {this.state.userlocal === null || this.state.userlocal === undefined ? null:
                                     <li class="nav-item">
                                     <Link to={'/Voucher'}>
                                <a class="nav-link">Vouchers</a>
                                </Link>
                              </li>
                                  }
                                  {this.state.userlocal === null || this.state.userlocal === undefined? <span>
                                       <li class="nav-item">
                                    <a class="nav-link" onClick={this.handleOpen}>Login/Signup</a>
                                  </li>
                                    
                                    
                                    </span>:
                                    
                                  
                                       <li class="nav-item">
                                    <a class="nav-link" onClick={this.logout}>Logout</a>
                                  </li>
                                    
                                    }
                                   
                               
                                </ul>
                            </div>                            
                        </nav>            
                    </div>
                </div>
            </div>
            <div class="tm-section tm-bg-img" id="tm-section-1">
                <div class="tm-bg-white ie-container-width-fix-2">
                    <div class="container ie-h-align-center-fix">
                        <div class="row">
                            <div class="col-xs-12 ml-auto mr-auto ie-container-width-fix">
                                <form action="index.html" method="get" class="tm-search-form tm-section-pad-2">
                                    <div class="form-row tm-search-form-row">
                                       
                                        <div class="form-group tm-form-element tm-form-element-50">
                                            <i class="fa fa-calendar fa-2x tm-form-element-icon"></i>
                                            <input type="date" class="form-control" placeholder="Check In" name="check_in" onChange={this.select}/>
                                        </div>
                                        <div class="form-group tm-form-element tm-form-element-50">
                                            <i class="fa fa-calendar fa-2x tm-form-element-icon"></i>
                                            <input type="date" class="form-control" placeholder="Check Out" name="check_out" onChange={this.select}/>
                                        </div>
                                    </div>
                                    <div class="form-row tm-search-form-row">
                                        <div class="form-group tm-form-element tm-form-element-50">                                            
                                            <select name="guest" class="form-control tm-select" id="adult" onChange={this.select}>
                                                <option value="">Adult</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                            <i class="fa fa-2x fa-user tm-form-element-icon"></i>
                                        </div>
                                        <div class="form-group tm-form-element tm-form-element-100">
                                        
                                    
                                            <Select
                                            class="form-control"
        value={this.state.selectedOption}
        placeholder="Type your destination..."
        onChange={this.handleChange}
        options={options}
        styles={{marginLeft: 30}}
      />
                                        </div>
                                        <div class="form-group tm-form-element tm-form-element-2">
                                            
                                            <button type="submit" class="btn btn-primary tm-btn-search" classes={{ disabled: {backgroundColor: 'white'} }} onClick={this.onSubmit} disabled={this.state.guest !== "" && this.state.check_out!== "" && this.state.check_in!== "" && this.state.selectedOption!== null?false:true}>Check Rooms</button>
                                        
                                        </div>
                                      </div>
                                      <div class="form-row clearfix pl-2 pr-2 tm-fx-col-xs">
                                          <p class="tm-margin-b-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                          <a href="#" class="ie-10-ml-auto ml-auto mt-1 tm-font-semibold tm-color-primary">Need Help?</a>
                                      </div>
                                </form>
                            </div>                        
                        </div>      
                    </div>
                </div>                  
            </div>
            
            <div class="tm-section-2">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <h2 class="tm-section-title">We are here to accomodate you!</h2>
                            <p class="tm-color-white tm-section-subtitle">Subscribe to get our newsletters</p>
                            <a href="#" class="tm-color-white tm-btn-white-bordered">Subscribe Newletters</a>
                        </div>                
                    </div>
                </div>        
            </div>
            
            <div class="tm-section tm-position-relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" class="tm-section-down-arrow">
                    <polygon fill="#e87b1c" points="0,0  100,0  50,60"></polygon>                   
                </svg> 
                <div class="container tm-pt-5 tm-pb-4">
                    <div class="row text-center">
                        <article class="col-sm-12 col-md-4 col-lg-4 col-xl-4 tm-article">                            
                            <i class="fa tm-fa-6x fa-legal tm-color-primary tm-margin-b-20"></i>
                            <h3 class="tm-color-primary tm-article-title-1">Pellentesque accumsan arcu nec dolor tempus</h3>
                            <p>Pellentesque at velit ante. Duis scelerisque metus vel felis porttitor gravida. Donec at felis libero. Mauris odio tortor.</p>
                            <a href="#" class="text-uppercase tm-color-primary tm-font-semibold">Continue reading...</a>
                        </article>
                        <article class="col-sm-12 col-md-4 col-lg-4 col-xl-4 tm-article">                            
                            <i class="fa tm-fa-6x fa-plane tm-color-primary tm-margin-b-20"></i>
                            <h3 class="tm-color-primary tm-article-title-1">Duis scelerisque metus vel felis porttitor</h3>
                            <p>Pellentesque at velit ante. Duis scelerisque metus vel felis porttitor gravida. Donec at felis libero. Mauris odio tortor.</p>
                            <a href="#" class="text-uppercase tm-color-primary tm-font-semibold">Continue reading...</a>                            
                        </article>
                        <article class="col-sm-12 col-md-4 col-lg-4 col-xl-4 tm-article">                           
                            <i class="fa tm-fa-6x fa-life-saver tm-color-primary tm-margin-b-20"></i>
                            <h3 class="tm-color-primary tm-article-title-1">Etiam aliquam arcu at mauris consectetur</h3>
                            <p>Pellentesque at velit ante. Duis scelerisque metus vel felis porttitor gravida. Donec at felis libero. Mauris odio tortor.</p>
                            <a href="#" class="text-uppercase tm-color-primary tm-font-semibold">Continue reading...</a>                           
                        </article>
                    </div>        
                </div>
            </div>
            
            <div class="tm-section tm-section-pad tm-bg-gray" id="tm-section-4">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8">
                            <div class="tm-article-carousel"> 
                            <Carousel>
  <Carousel.Item>
  <article class="tm-bg-white mr-2 tm-carousel-item">
                                    <img src="img/img-01.jpg" alt="Image" class="img-fluid" width={300} height={150} style={{marginLeft: '30%'}}/>
                                    <div class="tm-article-pad">
                                        <header><h3 class="text-uppercase tm-article-title-2">Nunc in felis aliquet metus luctus iaculis</h3></header>
                                        <p>Aliquam ac lacus volutpat, dictum risus at, scelerisque nulla. Nullam sollicitudin at augue venenatis eleifend. Nulla ligula ligula, egestas sit amet viverra id, iaculis sit amet ligula.</p>
                                        <a href="#" class="text-uppercase btn-primary tm-btn-primary">Get More Info.</a>
                                    </div>                                
                                </article>  
  
  </Carousel.Item>
  <Carousel.Item>
  <article class="tm-bg-white mr-2 tm-carousel-item">
                                    <img src="img/img-01.jpg" alt="Image" class="img-fluid" width={300} height={150} style={{marginLeft: '30%'}}/>
                                    <div class="tm-article-pad">
                                        <header><h3 class="text-uppercase tm-article-title-2">Nunc in felis aliquet metus luctus iaculis</h3></header>
                                        <p>Aliquam ac lacus volutpat, dictum risus at, scelerisque nulla. Nullam sollicitudin at augue venenatis eleifend. Nulla ligula ligula, egestas sit amet viverra id, iaculis sit amet ligula.</p>
                                        <a href="#" class="text-uppercase btn-primary tm-btn-primary">Get More Info.</a>
                                    </div>                                
                                </article>  

  
  </Carousel.Item>
  <Carousel.Item>
  <article class="tm-bg-white mr-2 tm-carousel-item">
                                    <img src="img/img-01.jpg" alt="Image" class="img-fluid" width={300} height={150} style={{marginLeft: '30%'}}/>
                                    <div class="tm-article-pad">
                                        <header><h3 class="text-uppercase tm-article-title-2">Nunc in felis aliquet metus luctus iaculis</h3></header>
                                        <p>Aliquam ac lacus volutpat, dictum risus at, scelerisque nulla. Nullam sollicitudin at augue venenatis eleifend. Nulla ligula ligula, egestas sit amet viverra id, iaculis sit amet ligula.</p>
                                        <a href="#" class="text-uppercase btn-primary tm-btn-primary">Get More Info.</a>
                                    </div>                                
                                </article>  

  </Carousel.Item>
</Carousel>                           
                                                  
                                
                            </div>    
                        </div>
                        
                        <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-recommended-container">
                            <div class="tm-bg-white">
                                <div class="tm-bg-primary tm-sidebar-pad">
                                    <h3 class="tm-color-white tm-sidebar-title">Recommended Places</h3>
                                    <p class="tm-color-white tm-margin-b-0 tm-font-light">Enamel pin cliche tilde, kitsch and VHS thundercats</p>
                                </div>
                                <div class="tm-sidebar-pad-2">
                                <a href="#" class="media tm-media tm-recommended-item">
                                        <img src="img/luzon.jpg" alt="Image" width={100} height={60} />
                                        <div class="media-body tm-media-body tm-bg-gray">
                                            <h4 class="text-uppercase tm-font-semibold tm-sidebar-item-title">Luzon</h4>
                                        </div>                                        
                                    </a>
                                    <a href="#" class="media tm-media tm-recommended-item">
                                        <img src="img/manila.jpg" alt="Image" width={100} height={60}/>
                                        <div class="media-body tm-media-body tm-bg-gray">
                                            <h4 class="text-uppercase tm-font-semibold tm-sidebar-item-title">Mega Manila</h4>
                                        </div>
                                    </a>
                                    <a href="#" class="media tm-media tm-recommended-item">
                                        <img src="img/visayas.jpg" alt="Image" width={100} height={60}/>
                                        <div class="media-body tm-media-body tm-bg-gray">
                                            <h4 class="text-uppercase tm-font-semibold tm-sidebar-item-title">Visayas</h4>
                                        </div>
                                    </a>
                                    <a href="#" class="media tm-media tm-recommended-item">
                                        <img src="img/mindanao.jpg" alt="Image" width={100} height={60}/>
                                        <div class="media-body tm-media-body tm-bg-gray">
                                            <h4 class="text-uppercase tm-font-semibold tm-sidebar-item-title">Mindanao</h4>
                                        </div>
                                    </a>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>


                <div class="tm-section tm-section-pad tm-bg-img" id="tm-section-5">                                                        
                    <div class="ie-h-align-center-fix" style={{width: '90%'}}>
                        <div class="row tm-flex-align-center">
                            <div class="col-xs-12 col-md-12 col-lg-2 col-xl-2 tm-media-title-container">
                                <h2 class="text-uppercase tm-section-title-2">Featured</h2>
                                <h3 class="tm-color-primary tm-font-semibold tm-section-subtitle-2">Rooms</h3>
                            </div>
                            <div class="col-xs-12 col-md-12 col-lg-10 col-xl-10 mt-0 mt-sm-3">
                                <div class="ml-auto tm-bg-white-shadow tm-pad tm-media-container">
                                    {this.state.featured_room.map((res, index)=>
                                     <article class="media tm-margin-b-20 tm-media-1" key={index}>

{
            res.img.length < 1?
            <img src={'http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'} alt="Image" width={200} height={150} />  
            :
            res.img.map((info, index)=>{
                                  if (index === 0) { 
                                  return( <img src={info.original} alt="Image" width={200} height={150} />   )
                                  } }
                      
                              
       
       
       )}



                                  
                                     <div class="media-body tm-media-body-1 tm-media-body-v-center">
                                         <h3 class="tm-font-semibold tm-article-title-3">{res.name}</h3>
                                         <p>{res.hotel_name}</p>
                                         <p>{res.hotel_address+ ', '+ res.hotel_city}</p>
                                         <a href="#" class="text-uppercase tm-color-primary tm-font-semibold">₱ {res.rate_mode == "Daily"? this.currencyFormat(parseFloat(res.roomprice)): res.rate_mode == "Promo" && res.duration_mode == 'Daily'?this.currencyFormat(parseFloat(res.roomprice)):res.rate_mode == "Promo" && res.duration_mode == 'Hour'?this.currencyFormat(parseFloat(res.roomprice)):this.currencyFormat(parseFloat(res.roomprice_hour)) } {res.rate_mode == "Daily"? '/night': res.rate_mode == "Promo" && res.duration_mode == 'Daily'?"("+res.promo_duration+"nights)":res.rate_mode == "Promo" && res.duration_mode == 'Hour'?"/"+res.hour_duration+"hours": "/"+res.hour_duration+"hours"}
                                         
                                         <span style={{'float': 'right'}}>&nbsp; (Good for {res.max_person})</span>
                                         
                                         
                                         </a>
                                     </div>                                
                                 </article>
                                    )}
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
                 

                {window.innerWidth < 992?
    <div class="fixed-bottom-minimized">
 <div style={{textAlign: 'center', padding: '10px'}}>   <Link to={'/Home'}> <i class="fa fa-building-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Home</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/Booking'}>  <i class="fa fa-address-book-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Bookings</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/Voucher'}>  <i class="fa fa-ticket" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Voucher</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/More'}>  <i class="fa fa-cogs" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>More</span></Link></div>
 </div> :null


}
          
        </div>

</body>
    )
  }
}