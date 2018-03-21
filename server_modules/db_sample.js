// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.

'use strict';

const config = require('../server-config');
const database = require('../server_lib/database');
const databaseName = config.get('DATABASE');

if (module === require.main) {
  const prompt = require('prompt');
  prompt.start();

  console.log(
    `Running this script directly will allow you to initialize your mysql
    database with sample data.\n`);

  prompt.get(['user', 'password'], (err, result) => {

    const connection = database.createMultipleStatementConnection(result);

    if (err) {
      return;
    }
    //create the database
    connection.query(
       `USE \`` + databaseName + `\`;` + 
       
      'DELETE FROM users;' + 
      'DELETE FROM locations;' + 
      'DELETE FROM organizations;' + 

      'INSERT INTO organizations(id, name, description) VALUES ' +
      '(1, \'IgniterSpace Sri Lanka\', \'Igniter Global own subsidiary\'),'+
      '(2, \'AIS\', \'Asian International School\');' + 
      
      'INSERT INTO locations(id, name, description, organization_id) VALUES ' +
      '(1, \'IS Gampaha\', \'2nd makerspace of IgniterSpace\', 1),'+
      '(2, \'IS Narahenpita\', \'1st makerspace of IgniterSpace\', 1),' + 
      '(3, \'IS Negombo\', \'3rd makerspace of IgniterSpace\', 1),' + 
      '(4, \'AIS Colombo\', \'IgniterSpace franchise at Asian International School\', 2);'  +

      'INSERT INTO users(id, auth_provider, auth_ref, given_name, family_name, email, profile_image) VALUES ' +
      '(1, \'google\', \'00001\', \'Hasith\', \'Yaggahavita\', \'hasith@igniterspace.com\', \'\'),' +
      '(2, \'google\', \'00002\', \'Jehan\', \'Wijesinghe\', \'jehan@igniterspace.com\', \'\'),'  +
      '(3, \'google\', \'00002\', \'Harshana\', \'Wijesinghe\', \'harshanax@oki.lk\', \'\'),'  +
      '(4, \'google\', \'00003\', \'Hasith\', \'Yaggahavita\', \'hasith@gmail.com\', \'\'),'  +
      '(5, \'google\', \'00004\', \'Asitha\', \'Senarathne\', \'asithas@igniterspace.com\', \'\');'  +


      'INSERT INTO orders(order_id, location_id, user_id, created_date, shipped) VALUES ' +
      '(1, 1, 1, \'2012-02-26 09:31:01\' , \'2013-02-28 08:30:00\' ),'+
      '(2, 3, 2, \'2016-01-14 05:52:02\' , \'2014-05-25 05:30:50\' ),'+
      '(3, 2, 3, \'2014-02-26 10:33:03\' , \'2015-02-28 08:30:00\' ),'+
      '(4, 4, 4, \'2016-02-26 11:34:04\' , \'2016-02-28 08:30:00\' ),'+
      '(5, 2, 1, \'2017-02-26 12:35:05\' , \'2017-02-28 08:30:00\' ),'+
      '(6, 1, 2, \'2017-02-26 14:36:06\' , \'2017-02-28 08:30:00\' );' +

      'INSERT INTO inventory_items(item_id, note, quantity, unit_price) VALUES ' +
      '(1,\'Small, red\', 100, 120),'+
      '(2, \'Small, red\', 20, 70),'+
      '(3,\'Small, red\', 35, 20),'+
      '(4,\'Small, red\', 300, 4),'+
      '(5,\'Small, red\', 500, 8),'+
      '(6,\'Small, red\', 3000, 2),'+
      '(7,\'Small, red\', 400, 8),'+
      '(8,\'Small, red\', 900, 20),'+
      '(9,\'Small, red\', 48, 120),'+
      '(10,\'Small, red\', 90, 20);'+

      'INSERT INTO products(product_id, code, name, unit, description, has_quantity) VALUES ' +
      '(1, \'b053\', \'Glue Sticks - 7 mm\',\' Kilogram\',\'Adehsives, Craft/\', 0),'+
      '(2, \'b058\', \'Tape - Double Sided \',\' Roll\',\'Adehsives, Craft/\', 0),'+
      '(3, \'b035\', \'Felt Pen\',\' Item\',\'Misc., Craft/\', 0),'+
      '(4, \'b026\', \'File Clips\',\' Box\',\'Misc., Craft/\', 0),'+
      '(5, \'b028\', \'Googly Eye\',\' Packet\',\'Misc., Craft/\', 0),'+
      '(6, \'b034\', \'Pipe Cleaner\',\' Item\',\'Misc., Craft/\', 0),'+
      '(7, \'b047\', \'String\',\'Roll\',\'Misc., Craft/\', 0),'+
      '(8, \'b101\', \'Nut\',\' Item\',\'Misc., Craft/\', 0),'+
      '(9, \'b006\', \'Cardboard - A4\',\' Item\',\'Paper, Craft/\', 0),'+
      '(10, \'b148\', \'Cardboard - A5\',\' Item\',\'Paper, Craft/\', 0),'+
      '(11, \'b008\', \'Hardboard - A6\',\' Item\',\'Paper, Craft/\', 0),'+
      '(12, \'b009\', \'Cardboard - Strip\',\' Item\',\'Paper, Craft/\', 0),'+
      '(13, \'b012\', \'Cotton Buds\',\' Item\',\'Paper, Craft/\', 0),'+
      '(14, \'b022\', \'Paper Cup\',\' Item\',\'Paper, Craft/\', 0),'+
      '(15, \'b032\', \'Paper Sheets A3\',\' Item\',\'Paper, Craft/\', 0),'+
      '(16, \'b001\', \'Balloon\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(17, \'b003\', \'Bottle Lid  - Large\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(18, \'b004\', \'Bottle Lid  - Meduim\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(19, \'b005\', \'Bottle Lid  - Small\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(20, \'b010\', \'CD\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(21, \'b024\', \'Erasor\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(22, \'b033\', \'Ping Pong Ball\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(23, \'b036\', \'Propeller\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(24, \'b037\', \'Properller - Nose Hook\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(25, \'b038\', \'Form Block\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(26, \'b039\', \'Rubber Band - Large\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(27, \'b040\', \'Rubber Band - Small\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(28, \'b043\', \'Soap Container\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(29, \'b044\', \'Spoon\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(30, \'b045\', \'Straw\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(31, \'b046\', \'Syringe - 5ml\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(32, \'b048\', \'Toothbrush\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(33, \'b049\', \'Airline Tube\',\' Meter\',\'Plastic, Craft/\', 0),'+
      '(34, \'b050\', \'Plastic Button\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(35, \'b052\', \'Cable Tie - 6 inches\',\' Item\',\'Plastic, Craft/\', 0),'+
      '(36, \'b011\', \'Clothes Peg\',\' Item\',\'Wooden, Craft/\', 0),'+
      '(37, \'b014\', \'Craft Stick - Large\',\' Item\',\'Wooden, Craft/\', 0),'+
      '(38, \'b017\', \'Craft Stick - Small\',\' Item\',\'Wooden, Craft/\', 0),'+
      '(39, \'b015\', \'Craft Dowel\',\' Item\',\'Wooden, Craft/\', 0),'+
      '(40, \'b021\', \'Craft Cube\',\' Item\',\'Wooden, Craft/\', 0),'+
      '(41, \'b051\', \'Barbecue Stick\',\' Item\',\'Wooden, Craft/\', 0),'+
      '(42, \'b019\', \'Square Beads\',\' Gram\',\'Wooden, Craft/\', 0),'+
      '(43, \'b061\', \'Battery Cell - 9V\',\' Item\',\'Battery, Elect/\', 0),'+
      '(44, \'b062\', \'Battery Cell - AA\',\' Item\',\'Battery, Elect/\', 0),'+
      '(45, \'b063\', \'Battery Holder - AA\',\' Item\',\'Battery, Elect/\', 0),'+
      '(46, \'b065\', \'Coin Cell - CR2032\',\' Item\',\'Battery, Elect/\', 0),'+
      '(47, \'b067\', \'Battery Snap - 9V\',\' Item\',\'Battery, Elect/\', 0),'+
      '(48, \'b071\', \'Capacitor 100uf\',\' Item\',\'Capacitor, Elect/\', 0),'+
      '(49, \'b072\', \'Capacitor 10uf\',\' Item\',\'Capacitor, Elect/\', 0),'+
      '(50, \'b073\', \'Capacitor 1uf\',\' Item\',\'Capacitor, Elect/\', 0),'+
      '(51, \'b074\', \'Capacitor 4.7uf\',\' Item\',\'Capacitor, Elect/\', 0),'+
      '(52, \'b060\', \'Aluminium Foil\',\' Roll\',\'Conductor, Elect/\', 0),'+
      '(53, \'b068\', \'Copper Wire\',\' Meter\',\'Conductor, Elect/\', 0),'+
      '(54, \'b075\', \'Conductive Tape\',\' Roll\',\'Conductor, Elect/\', 0),'+
      '(55, \'b077\', \'Prototype Board\',\' Item\',\'Conductor, Elect/\', 0),'+
      '(56, \'b083\', \'Jumber Wire - FF\',\' Item\',\'Conductor, Elect/\', 0),'+
      '(57, \'b084\', \'Jumper Wire - FM\',\' Item\',\'Conductor, Elect/\', 0),'+
      '(58, \'b085\', \'Jumper Wire - MM\',\' Item\',\'Conductor, Elect/\', 0),'+
      '(59, \'b114\', \'Soldering Lead Role\',\' Roll\',\'Conductor, Elect/\', 0),'+
      '(60, \'b128\', \'Wire ADSL (m)\',\' Meter\',\'Conductor, Elect/\', 0),'+
      '(61, \'b129\', \'Wire Circuit (Meters)\',\' Meter\',\'Conductor, Elect/\', 0),'+
      '(62, \'____\', \'Wire Twin (Meters)\',\' Meter\',\'Conductor, Elect/\', 0),'+
      '(63, \'b131\', \'Copper Wire 32\',\' Gram\',\'Conductor, Elect/\', 0),'+
      '(64, \'b134\', \'Aluminium Foil (sqft)\',\' Meter\',\'Conductor, Elect/\', 0),'+
      '(65, \'b137\', \'Dot Board Large\',\' Item\',\'Conductor, Elect/\', 0),'+
      '(66, \'b144\', \'Breadboard Small\',\' Item\',\'Conductor, Elect/\', 0),'+
      '(67, \'b076\', \'Diode IN4002\',\' Item\',\'Diode, Elect/\', 0),'+
      '(68, \'b082\', \'IC UM66\',\' Item\',\'IC, Elect/\', 0),'+
      '(69, \'b147\', \'IC NE 555\',\' Item\',\'IC, Elect/\', 0),'+
      '(70, \'b139\', \'LM 317\',\' Item\',\'IC, Elect/\', 0),'+
      '(71, \'b069\', \'Piezo Buzzer\',\' Item\',\'Light & Sound, Elect/\', 0),'+
      '(72, \'b086\', \'LDR\',\' Item\',\'Light & Sound, Elect/\', 0),'+
      '(73, \'b087\', \'LED .5W \',\' Item\',\'Light & Sound, Elect/\', 0),'+
      '(74, \'b089\', \'LED 3mm Color Green\',\' Item\',\'Light & Sound, Elect/\', 0),'+
      '(75, \'b090\', \'LED 3mm Color Red\',\' Item\',\'Light & Sound, Elect/\', 0),'+
      '(76, \'b091\', \'LED 3mm Color Yellow\',\' Item\',\'Light & Sound, Elect/\', 0),'+
      '(77, \'b093\', \'LED IR\',\' Item\',\'Light & Sound, Elect/\', 0),'+
      '(78, \'b094\', \'LED RGB\',\' Item\',\'Light & Sound, Elect/\', 0),'+
      '(79, \'b104\', \'IR Photodiode\',\' Item\',\'Light & Sound, Elect/\', 0),'+
      '(80, \'b095\', \'Magnets Medium\',\' Item\',\'Magnet, Elect/\', 0),'+
      '(81, \'b096\', \'Magnets Small\',\' Item\',\'Magnet, Elect/\', 0),'+
      '(82, \'b096\', \'Magnets Small\',\' Item\',\'Magnet, Elect/\', 0),'+
      '(83, \'b097\', \'Gear Motor\',\' Item\',\'Motor, Elect/\', 0),'+
      '(84, \'b098\', \'12V Motor\',\' Item\',\'Motor, Elect/\', 0),'+
      '(85, \'b099\', \'Simple Motor\',\' Item\',\'Motor, Elect/\', 0),'+
      '(86, \'b100\', \'Vibration Motor 3V\',\' Item\',\'Motor, Elect/\', 0),'+
      '(87, \'b141\', \'Project Box\',\' Item\',\'Plastic, Elect/\', 0),'+
      '(88, \'b102\', \'Preset 100K\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(89, \'b103\', \'Preset 10K\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(90, \'b146\', \'Preset 1K\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(91, \'b105\', \'Resistor 100K\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(92, \'b106\', \'Resistor 100R\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(93, \'b107\', \'Resistor 10K\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(94, \'b108\', \'Resistor 1K\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(95, \'b109\', \'Resistor 1M\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(96, \'b110\', \'Resistor 220R\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(97, \'b111\', \'Resistor 470R\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(98, \'b112\', \'Resistor 47K\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(99, \'b145\', \'Resistor 330R\',\' Item\',\'Resistor, Elect/\', 0),'+
      '(100, \'b117\', \'Switch Arm\',\' Item\',\'Switch, Elect/\', 0),'+
      '(101, \'b118\', \'Switch DPDT\',\' Item\',\'Switch, Elect/\', 0),'+
      '(102, \'b119\', \'Switch On-Off-On\',\' Item\',\'Switch, Elect/\', 0),'+
      '(103, \'b120\', \'Switch Push\',\' Item\',\'Switch, Elect/\', 0),'+
      '(104, \'b121\', \'Switch Reed\',\' Item\',\'Switch, Elect/\', 0),'+
      '(105, \'b122\', \'Switch SPDT\',\' Item\',\'Switch, Elect/\', 0),'+
      '(106, \'b123\', \'Switch Tilt \',\' Item\',\'Switch, Elect/\', 0),'+
      '(107, \'b143\', \'Switch SPST\',\' Item\',\'Switch, Elect/\', 0),'+
      '(108, \'b124\', \'Transistor 2N2222\',\' Item\',\'Transistor, Elect/\', 0),'+
      '(109, \'b125\', \'Transistor 2N3904\',\' Item\',\'Transistor, Elect/\', 0),'+
      '(110, \'b126\', \'Transistor BC547\',\' Item\',\'Transistor, Elect/\', 0),'+
      '(111, \'b127\', \'Transistor D313\',\' Item\',\'Transistor, Elect/\', 0),'+
      '(113, \'t001\', \'Glue Gun\',\' Item\',\'Tool/\', 0),'+
      '(114, \'t002\', \'Soldering Iron 40W\',\' Item\',\'Tool/\', 0),'+
      '(115, \'t003\', \'Tape Insulation\',\' Item\',\'Roll/\', 0),'+
      '(116, \'t004\', \'Soldering Stand\',\' Item\',\'Tool/\', 0),'+
      '(117, \'t005\', \'Bouth Cleaner\',\' Item\',\'Tool/\', 0),'+
      '(118, \'t006\', \'Scissor\',\' Item\',\'Tool/\', 0),'+
      '(119, \'t007\', \'Electrical Tester\',\' Item\',\'Tool/\', 0),'+
      '(120, \'t008\', \'Papercutter\',\' Item\',\'Tool/\', 0),'+
      '(121, \'t009\', \'Pencil\',\' Item\',\'Tool/\', 0),'+
      '(122, \'t010\', \'Screw Driver Flat\',\' Item\',\'Tool/\', 0),'+
      '(123, \'t011\', \'Screw Driver Phillips\',\' Item\',\'Tool/\', 0),'+
      '(124, \'t012\', \'Electric Adaptor\',\' Item\',\'Tool/\', 0),'+
      '(125, \'t013\', \'Extension Cable\',\' Item\',\'Tool/\', 0),'+
      '(126, \'t014\', \'Whiteboard Marker Pen\',\' Item\',\'Tool/\', 0),'+
      '(127, \'t016\', \'Safety Google\',\' Item\',\'Tool/\', 0),'+
      '(128, \'t015\', \'Soldering Iron 30W\',\' Item\',\'Tool/\', 0),'+
      '(129, \'a001\', \'Multimeter\',\' Item\',\'Asset/\', 0),'+
      '(130, \'a002\', \'3D Printer\',\' Item\',\'Asset/\', 0),'+
      '(131, \'a003\', \'Projector\',\' Item\',\'Asset/\', 0),'+
      '(132, \'a004\', \'Tablet Computer\',\' Item\',\'Asset/\', 0),'+
      '(133, \'a005\', \'Laptop Computer\',\' Item\',\'Asset/\', 0),'+
      '(134, \'a006\', \'Printer\',\' Item\',\'Asset/\', 0),'+
      '(135, \'a007\', \'Creditcard Machine\',\' Item\',\'Asset/\', 0),'+
      '(136, \'a008\', \'Emergency Lights\',\' Item\',\'Asset/\', 0),'+
      '(137, \'a009\', \'Speaker\',\' Item\',\'Asset/\', 0),'+
      '(138, \'a010\', \'Sound System\',\' Item\',\'Asset/\', 0),'+
      '(139, \'a011\', \'Amplifier\',\' Item\',\'Asset/\', 0),'+
      '(140, \'a012\', \'Baby Pool\',\' Item\',\'Asset/\', 0),'+
      '(141, \'a013\', \'Storage Container\',\' Item\',\'Asset/\', 0),'+
      '(142, \'a014\', \'Class Table\',\' Item\',\'Asset/\', 0),'+
      '(143, \'a015\', \'Class Chair\',\' Item\',\'Asset/\', 0),'+
      '(144, \'a016\', \'Reception Table\',\' Item\',\'Asset/\', 0),'+
      '(145, \'a017\', \'CCTV Camera\',\' Item\',\'Asset/\', 0),'+
      '(146, \'a018\', \'LCD Screen\',\' Item\',\'Asset/\', 0),'+
      '(147, \'a019\', \'CCTV DVR\',\' Item\',\'Asset/\', 0),'+
      '(148, \'a020\', \'Office Table\',\' Item\',\'Asset/\', 0),'+
      '(149, \'a021\', \'Office Chair\',\' Item\',\'Asset/\', 0),'+
      '(150, \'a022\', \'Fire Extinguisher\',\' Item\',\'Asset/\', 0),'+
      '(151, \'a023\', \'Reception Sofa\',\' Item\',\'Asset/\', 0),'+
      '(152, \'a024\', \'Water Dispenser\',\' Item\',\'Asset/\', 0),'+
      '(153, \'a025\', \'Steel Cupboard\',\' Item\',\'Asset/\', 0),'+
      '(154, \'a026\', \'Plastic Cupboard\',\' Item\',\'Asset/\', 0),'+
      '(155, \'a027\', \'Whiteboard\',\' Item\',\'Asset/\', 0),'+
      '(156, \'a028\', \'4G Router\',\' Item\',\'Asset/\', 0),'+
      '(157, \'a029\', \'Power Cord\',\' Item\',\'Asset/\', 0),'+
      '(158, \'b135\', \'Packing Bag XLarge\',\' Item\',\'Craft/\', 0),'+
      '(159, \'b030\', \'Paper Sheet - A4\',\' Item\',\'Craft/\', 0),'+
      '(160, \'b031\', \'Paper Sheet - A5\',\' Item\',\'Craft/\', 0),'+
      '(161, \'b054\', \'Packing Bag Large\',\' Item\',\'Craft/\', 0),'+
      '(162, \'b055\', \'Packing Bag Medium\',\' Item\',\'Craft/\', 0),'+
      '(163, \'b056\', \'Packing Bag Small\',\' Item\',\'Craft/\', 0),'+
      '(164, \'b057\', \'Packing Bag Xtra Large\',\' Item\',\'Craft/\', 0);'+


      

      'INSERT INTO orders_inventory_items(o_id, i_id) VALUES ' +
      '(1, 2),'+
      '(1, 7),'+
      '(2, 10),'+
      '(2, 9),'+
      '(3, 5),'+
      '(3, 6),'+
      '(4, 4),'+
      '(5, 1),'+
      '(6, 3),'+
      '(4, 8);'+

      'INSERT INTO product_inventory_items( i_id, p_id ) VALUES ' +
      '(1, 2),'+
      '(2, 3),'+
      '(3, 4),'+
      '(4, 1),'+
      '(5, 6),'+
      '(6, 5),'+
      '(7, 2),'+
      '(8, 3),'+
      '(9, 2),'+                  
      '(10,6);'+

      

      'INSERT INTO guardians(id, name, home_number, mobile_number, email_address) VALUES ' +
      '(999,\'Kumudu Rathnayake\', \'0332222958\', \'0779158987\' ,  \'kumudu@igniterspace.com\'),'+
      '(998,\'Hasith Yaggahavita\', \'0332221819\', \'0716624132\' ,  \'hasith@igniterspace.com\'),'+
      '(997,\'Ananda Wijewickrama\', \'0332222917\', \'0710510274\' ,  \'anandaw@yahoo.com\'),'+
      '(996,\'Chathura Senarathne\', \'0332228008\', \'0774636898\' ,  \'chathuras@igniterspace.com\');' +

      'INSERT INTO students(id, first_name, last_name, date_of_birth, home_address, gender,g_id) VALUES ' +
      '(001,\'Hasith\',\'Yaggahavita\', \'28-09-1979\' ,  \'287,Yakkala Rd,Gampaha\', \'male\', 999),'+
      '(002,\'Jehan\',\'Wijesinghe\',\'05-09-1996\' , \'7, charles place,colombo\', \'male\', 998),'+
      '(003,\'Achintha\',\'Wijewickrama\',\'06-11-1993\' ,  \'287,Yakkala Rd,Gampaha\', \'male\', 997),'+
      '(004,\'Asitha\',\'Senarathne\',\'02-04-1992\' ,  \'12/2 Bandaranayake Rd, Katubadde\', \'male\', 996),'  +
      '(005, \'Subha\',\'Wijesinghe\', \'08-09-1972\', \'No 10, Sri Bodhi Rd, Gampaha\',\'female\',996);' +

      'INSERT INTO courses(id, batch, name, year, from_date, to_date, day ) VALUES ' +
      '(1,\'Batch-3\',\'Level-1\',\'2017\', \'28-02-2017\' ,  \'28-08-2017\', \'Saturday\'),'+
      '(2,\'Batch-3\',\'Level-2\',\'2017/2018\',\'05-09-2017\' , \'05-03-2018\', \'Saturday\'),'+
      '(3,\'Batch-3\',\'Level-3\',\'2018\',\'06-01-2018\' ,  \'06-06-2018\', \'Saturday\'),'+
      '(4,\'Batch-4\',\'Level-4(Computing)\',\'2017\',\'02-04-2018\' ,\'02-10-2018\', \'Sunday\'),'  +
      '(5,\'Batch-5\',\'Level-1\',\'2016/2017\', \'08-09-2016\', \'08-03-2017\', \'Sunday\');' +

      'INSERT INTO lessons(id, name) VALUES ' +
      '(1,\'Golfer Bot\' ),'+
      '(2,\'Touch Torch\'),'+
      '(3,\'Night Light\'),'+
      '(4,\'Music Box\'),'  +
      '(5,\'Generator\');'+

      'INSERT INTO lessons_in_course(c_id, l_id, held_date) VALUES ' +
      '(1, 1, \'2017-02-28\'),'+
      '(1, 2, \'2017-05-09\'),'+
      '(2, 1, \'2018-06-01\'),'+
      '(3, 3, \'2018-02-04\'),'+
      '(3, 5, \'2016-08-09\'),'+
      '(4, 4, \'2016-10-09\'),'+
      '(5, 1, \'2018-11-12\'),'+
      '(5, 3, \'2018-06-11\');'+
     
      'INSERT INTO students_in_course(c_id, s_id) VALUES ' +
      '(1, 1),'+
      '(1, 2),'+
      '(2, 1),'+
      '(3, 3),'+
      '(3, 5),'+
      '(4, 4),'+
      '(5, 1),'+
      '(5, 3);'+

      'INSERT INTO students_in_lesson(l_id, s_id) VALUES ' +
      '(1, 1),'+
      '(1, 2),'+
      '(2, 1),'+
      '(3, 3),'+
      '(3, 5),'+
      '(4, 4),'+
      '(5, 1),'+
      '(5, 3);',

      (err) => {
        if (err) {
          throw err;
        }
        console.log('Successfully inserted sample data to the database');
        connection.end();
      }
    );
  });
}
