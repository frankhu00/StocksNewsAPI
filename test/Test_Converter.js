import { expect, assert } from 'chai';
import Converter from '../models/Converter.js';

let xmlConvert = new Converter();

describe('Converter', () => {

  describe('ParseXml', () => {
    it('SimpleXmlTest', () => {
      let simpleXml = "<xml>Simple XML</xml>";
      let expectedJson =  {
        xml : "Simple XML"
      };
      expect(xmlConvert.convertToJson(simpleXml)).to.deep.equal(expectedJson);
    });

    it('NestedXmlTest', () => {
      let nestedXml = "<xml><status><results>200</results></status></xml>";
      let expectedJson = {
        xml : {
          status : {
            results : "200"
          }
        }
      }
      expect(xmlConvert.convertToJson(nestedXml)).to.deep.equal(expectedJson);
    });

    it('ParallelXmlTest', () => {
      let parallelXml = "<xml><status>200</status><results>Hello</results><link>http:google</link></xml>"
      let expectedJson = {
        xml : {
          status: "200",
          results: "Hello",
          link: "http:google"
        }
      }
      expect(xmlConvert.convertToJson(parallelXml)).to.deep.equal(expectedJson);
    });

    it('DuplicatedKeyXmlTest', () => {
      let duplicatedXml = "<xml><item>Item-1</item><item>Item-2</item><item>Item-3</item></xml>"
      let expectedJson = {
        xml : {
          item : [
            "Item-1",
            "Item-2",
            "Item-3"
          ]
        }
      }
      expect(xmlConvert.convertToJson(duplicatedXml)).to.deep.equal(expectedJson);
    });

    it('NestedParallelsXmlTest', () => {
      let xml = "<xml><item><name>Item-1</name><price>$50.0</price></item><item><name>Item-2</name><price>$150.0</price></item><item><name>Item-3</name><price>$100.0</price></item></xml>"
      let expectedJson = {
        xml : {
          item : [
            {
              name : "Item-1",
              price : "$50.0"
            },
            {
              name : "Item-2",
              price : "$150.0"
            },
            {
              name: "Item-3",
              price : "$100.0"
            }
          ]
        }
      }
      expect(xmlConvert.convertToJson(xml)).to.deep.equal(expectedJson);
    });

  }); // End of ParseXml Test suite

  describe('CombineTwoJson', () => {

    it('CombineNonMatchingKeys', () => {
      let a = {
        a : "1"
      }

      let b = {
        b : "2"
      }

      let expected = {
        a : "1",
        b : "2"
      }
       expect(xmlConvert.combineJson(a, b)).to.deep.equal(expected);
    });

    it('CombineMatchingKeys', () => {
      let a = {
        a : "1"
      }

      let b = {
        a : "2"
      }

      let expected = {
        a : [
          "1",
          "2"
        ]
      }
       expect(xmlConvert.combineJson(a, b)).to.deep.equal(expected);
    });

    it('CombineMixedCases', () => {
      let a = {
        a : "1",
        b : "2"
      }

      let b = {
        a : "2",
        c : "5"
      }

      let expected = {
        a : [
          "1",
          "2"
        ],
        b : "2",
        c : "5"
      }
       expect(xmlConvert.combineJson(a, b)).to.deep.equal(expected);
    });

  }); // End of Converter.combineJson() Test Suite

  describe('XmlConvertWithRandomGeneratedXml', () => {

    it('RealXmlCaseOneTest', () => {
      let realXml = `<?xml version="1.0" encoding="UTF-8"?>
        <!--Anagrafica del clienti del mercato-->
        <anagrafica>
        	<testata>
        		<data>Giovedi 18 dicembre 2003 16.05.29</data>
        	</testata>
        	<record>
        		<codice_cliente>5</codice_cliente>
        		<rag_soc>Miami American Cafe</rag_soc>
        		<codice_fiscale>IT07654930130</codice_fiscale>
        		<num_prodotti>13</num_prodotti>
        	</record>
        	<record>
        		<codice_cliente>302</codice_cliente>
        		<rag_soc>Filiberto Gilardi</rag_soc>
        		<codice_fiscale>IT87654770157</codice_fiscale>
        		<num_prodotti>8</num_prodotti>
        	</record>
        	<record>
        		<codice_cliente>1302</codice_cliente>
        		<rag_soc>Eidon</rag_soc>
        		<codice_fiscale>IT887511231</codice_fiscale>
        		<num_prodotti>18</num_prodotti>
        	</record>
        	<record>
        		<codice_cliente>202</codice_cliente>
        		<rag_soc>SkillNet</rag_soc>
        		<codice_fiscale>IT887642131</codice_fiscale>
        		<num_prodotti>24</num_prodotti>
        	</record>
        	<record>
        		<codice_cliente>12</codice_cliente>
        		<rag_soc>Eidon</rag_soc>
        		<codice_fiscale>IT04835710965</codice_fiscale>
        		<num_prodotti>1112</num_prodotti>
        	</record>
        </anagrafica>`;

        let expectedJsonString = `{
          "anagrafica": {
            "testata": { "data": "Giovedi 18 dicembre 2003 16.05.29" },
            "record": [
              {
                "codice_cliente": "5",
                "rag_soc": "Miami American Cafe",
                "codice_fiscale": "IT07654930130",
                "num_prodotti": "13"
              },
              {
                "codice_cliente": "302",
                "rag_soc": "Filiberto Gilardi",
                "codice_fiscale": "IT87654770157",
                "num_prodotti": "8"
              },
              {
                "codice_cliente": "1302",
                "rag_soc": "Eidon",
                "codice_fiscale": "IT887511231",
                "num_prodotti": "18"
              },
              {
                "codice_cliente": "202",
                "rag_soc": "SkillNet",
                "codice_fiscale": "IT887642131",
                "num_prodotti": "24"
              },
              {
                "codice_cliente": "12",
                "rag_soc": "Eidon",
                "codice_fiscale": "IT04835710965",
                "num_prodotti": "1112"
              }
            ]
          }
        }`;

        let expected = JSON.parse(expectedJsonString);
        expect(xmlConvert.convertToJson(realXml)).to.deep.equal(expected);
    });

    it('RealXmlCaseTwoTest', () => {
      let xml = `<?xml version='1.0' encoding='UTF-8'?>
        <dataset>
          <record>
            <id>1</id>
            <first_name>Mildred</first_name>
            <last_name>Philipart</last_name>
            <email>mphilipart0@ucla.edu</email>
            <gender>Female</gender>
            <ip_address>18.183.231.98</ip_address>
          </record>
          <record>
            <id>2</id>
            <first_name>Cornelia</first_name>
            <last_name>Drohane</last_name>
            <email>cdrohane1@phoca.cz</email>
            <gender>Female</gender>
            <ip_address>209.125.75.24</ip_address>
          </record>
          <record>
            <id>3</id>
            <first_name>Alberik</first_name>
            <last_name>Zannetti</last_name>
            <email>azannetti2@techcrunch.com</email>
            <gender>Male</gender>
            <ip_address>9.59.239.205</ip_address>
          </record>
          <record>
            <id>4</id>
            <first_name>Kliment</first_name>
            <last_name>Hornung</last_name>
            <email>khornung3@drupal.org</email>
            <gender>Male</gender>
            <ip_address>195.56.105.80</ip_address>
          </record>
          <record>
            <id>5</id>
            <first_name>Dominique</first_name>
            <last_name>Marcham</last_name>
            <email>dmarcham4@hc360.com</email>
            <gender>Male</gender>
            <ip_address>44.109.222.1</ip_address>
          </record>
          <record>
            <id>6</id>
            <first_name>Bekki</first_name>
            <last_name>Schubert</last_name>
            <email>bschubert5@sphinn.com</email>
            <gender>Female</gender>
            <ip_address>106.109.32.165</ip_address>
          </record>
          <record>
            <id>7</id>
            <first_name>Kora</first_name>
            <last_name>Walburn</last_name>
            <email>kwalburn6@furl.net</email>
            <gender>Female</gender>
            <ip_address>206.200.160.107</ip_address>
          </record>
          <record>
            <id>8</id>
            <first_name>Shepperd</first_name>
            <last_name>Fairbeard</last_name>
            <email>sfairbeard7@discovery.com</email>
            <gender>Male</gender>
            <ip_address>29.177.226.218</ip_address>
          </record>
          <record>
            <id>9</id>
            <first_name>Korry</first_name>
            <last_name>Barkess</last_name>
            <email>kbarkess8@yahoo.com</email>
            <gender>Female</gender>
            <ip_address>47.92.251.133</ip_address>
          </record>
          <record>
            <id>10</id>
            <first_name>Claudette</first_name>
            <last_name>Rottgers</last_name>
            <email>crottgers9@123-reg.co.uk</email>
            <gender>Female</gender>
            <ip_address>143.129.54.233</ip_address>
          </record>
          <record>
            <id>11</id>
            <first_name>Francoise</first_name>
            <last_name>Brooksbie</last_name>
            <email>fbrooksbiea@google.co.jp</email>
            <gender>Female</gender>
            <ip_address>163.25.215.40</ip_address>
          </record>
          <record>
            <id>12</id>
            <first_name>Kilian</first_name>
            <last_name>Bush</last_name>
            <email>kbushb@jiathis.com</email>
            <gender>Male</gender>
            <ip_address>47.235.89.57</ip_address>
          </record>
          <record>
            <id>13</id>
            <first_name>Isabel</first_name>
            <last_name>Gerardet</last_name>
            <email>igerardetc@ustream.tv</email>
            <gender>Female</gender>
            <ip_address>0.226.123.227</ip_address>
          </record>
          <record>
            <id>14</id>
            <first_name>Fabien</first_name>
            <last_name>Sandiford</last_name>
            <email>fsandifordd@netlog.com</email>
            <gender>Male</gender>
            <ip_address>7.160.238.154</ip_address>
          </record>
          <record>
            <id>15</id>
            <first_name>Bondie</first_name>
            <last_name>Koeppe</last_name>
            <email>bkoeppee@blogger.com</email>
            <gender>Male</gender>
            <ip_address>74.238.118.113</ip_address>
          </record>
          <record>
            <id>16</id>
            <first_name>Miltie</first_name>
            <last_name>Coldbreath</last_name>
            <email>mcoldbreathf@paypal.com</email>
            <gender>Male</gender>
            <ip_address>110.22.109.91</ip_address>
          </record>
          <record>
            <id>17</id>
            <first_name>Eamon</first_name>
            <last_name>Melly</last_name>
            <email>emellyg@histats.com</email>
            <gender>Male</gender>
            <ip_address>233.189.115.58</ip_address>
          </record>
          <record>
            <id>18</id>
            <first_name>Marcy</first_name>
            <last_name>Malinowski</last_name>
            <email>mmalinowskih@scribd.com</email>
            <gender>Female</gender>
            <ip_address>74.245.59.96</ip_address>
          </record>
          <record>
            <id>19</id>
            <first_name>Valeda</first_name>
            <last_name>Glayzer</last_name>
            <email>vglayzeri@boston.com</email>
            <gender>Female</gender>
            <ip_address>246.51.156.199</ip_address>
          </record>
          <record>
            <id>20</id>
            <first_name>Hall</first_name>
            <last_name>McCathy</last_name>
            <email>hmccathyj@blogspot.com</email>
            <gender>Male</gender>
            <ip_address>158.129.240.20</ip_address>
          </record>
        </dataset>`;

        let expectedJsonString = `{
          "dataset": {
            "record": [
              {
                "id": "1",
                "first_name": "Mildred",
                "last_name": "Philipart",
                "email": "mphilipart0@ucla.edu",
                "gender": "Female",
                "ip_address": "18.183.231.98"
              },
              {
                "id": "2",
                "first_name": "Cornelia",
                "last_name": "Drohane",
                "email": "cdrohane1@phoca.cz",
                "gender": "Female",
                "ip_address": "209.125.75.24"
              },
              {
                "id": "3",
                "first_name": "Alberik",
                "last_name": "Zannetti",
                "email": "azannetti2@techcrunch.com",
                "gender": "Male",
                "ip_address": "9.59.239.205"
              },
              {
                "id": "4",
                "first_name": "Kliment",
                "last_name": "Hornung",
                "email": "khornung3@drupal.org",
                "gender": "Male",
                "ip_address": "195.56.105.80"
              },
              {
                "id": "5",
                "first_name": "Dominique",
                "last_name": "Marcham",
                "email": "dmarcham4@hc360.com",
                "gender": "Male",
                "ip_address": "44.109.222.1"
              },
              {
                "id": "6",
                "first_name": "Bekki",
                "last_name": "Schubert",
                "email": "bschubert5@sphinn.com",
                "gender": "Female",
                "ip_address": "106.109.32.165"
              },
              {
                "id": "7",
                "first_name": "Kora",
                "last_name": "Walburn",
                "email": "kwalburn6@furl.net",
                "gender": "Female",
                "ip_address": "206.200.160.107"
              },
              {
                "id": "8",
                "first_name": "Shepperd",
                "last_name": "Fairbeard",
                "email": "sfairbeard7@discovery.com",
                "gender": "Male",
                "ip_address": "29.177.226.218"
              },
              {
                "id": "9",
                "first_name": "Korry",
                "last_name": "Barkess",
                "email": "kbarkess8@yahoo.com",
                "gender": "Female",
                "ip_address": "47.92.251.133"
              },
              {
                "id": "10",
                "first_name": "Claudette",
                "last_name": "Rottgers",
                "email": "crottgers9@123-reg.co.uk",
                "gender": "Female",
                "ip_address": "143.129.54.233"
              },
              {
                "id": "11",
                "first_name": "Francoise",
                "last_name": "Brooksbie",
                "email": "fbrooksbiea@google.co.jp",
                "gender": "Female",
                "ip_address": "163.25.215.40"
              },
              {
                "id": "12",
                "first_name": "Kilian",
                "last_name": "Bush",
                "email": "kbushb@jiathis.com",
                "gender": "Male",
                "ip_address": "47.235.89.57"
              },
              {
                "id": "13",
                "first_name": "Isabel",
                "last_name": "Gerardet",
                "email": "igerardetc@ustream.tv",
                "gender": "Female",
                "ip_address": "0.226.123.227"
              },
              {
                "id": "14",
                "first_name": "Fabien",
                "last_name": "Sandiford",
                "email": "fsandifordd@netlog.com",
                "gender": "Male",
                "ip_address": "7.160.238.154"
              },
              {
                "id": "15",
                "first_name": "Bondie",
                "last_name": "Koeppe",
                "email": "bkoeppee@blogger.com",
                "gender": "Male",
                "ip_address": "74.238.118.113"
              },
              {
                "id": "16",
                "first_name": "Miltie",
                "last_name": "Coldbreath",
                "email": "mcoldbreathf@paypal.com",
                "gender": "Male",
                "ip_address": "110.22.109.91"
              },
              {
                "id": "17",
                "first_name": "Eamon",
                "last_name": "Melly",
                "email": "emellyg@histats.com",
                "gender": "Male",
                "ip_address": "233.189.115.58"
              },
              {
                "id": "18",
                "first_name": "Marcy",
                "last_name": "Malinowski",
                "email": "mmalinowskih@scribd.com",
                "gender": "Female",
                "ip_address": "74.245.59.96"
              },
              {
                "id": "19",
                "first_name": "Valeda",
                "last_name": "Glayzer",
                "email": "vglayzeri@boston.com",
                "gender": "Female",
                "ip_address": "246.51.156.199"
              },
              {
                "id": "20",
                "first_name": "Hall",
                "last_name": "McCathy",
                "email": "hmccathyj@blogspot.com",
                "gender": "Male",
                "ip_address": "158.129.240.20"
              }
            ]
          }
        }`;

        let expected = JSON.parse(expectedJsonString)
        expect(xmlConvert.convertToJson(xml)).to.deep.equal(expected)
    });

  });

});
