// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require turbolinks
//= require quagga
//= require_tree .


window.addEventListener('load', function(){

	var userEmail = $('#current_user_email').html();

	if (userEmail){

		var socket = io.connect('http://192.168.43.150:8000');

		socket.on('connect', function(){
			console.log('handshake completed, connected to chat server');

			socket.emit('join_chat_room', {
				'chatroom_name': 'android_room',
				'user_email': userEmail
			});

			socket.on('new_user_joined', function(data){
				new Noty({
				    text: data.user_email + ' joined!',
				    theme: 'relax',
				    type: 'success',
				    layout: 'topLeft',
				    timeout: 1000
				}).show();
			});

			$('#send-message').unbind('click');
			$('#send-message').click(function(){
				let msg = $('#chat-message-input').val();

				if (msg != ''){

					socket.emit('send_message', {
						'message': msg,
						'user_email': userEmail,
						'chatroom_name': 'android_room'
					});
					$('#chat-message-input').val('');

				}

			});
		var scrollT = 0;
			socket.on('receive_message', function(data){
				console.log(data);

				var messageType = 'self-message';
				if (data.user_email != userEmail){
					messageType = 'other-message';
				}

				var newMessage = $('<li>', {
					'class': messageType
				});

				var messageText = $('<span>', {
					'html': data.message + '<br>' + data.user_email
				});

				newMessage.append(messageText);
				$('#chat-messages-list').append(newMessage);
				
				scrollT += 100
				$('#chat-messages-list').animate({
				  scrollTop: scrollT
				}, 100);

			});





		});
	}
});

// function order_by_occurrence(arr) {
//   var counts = {};
//   arr.forEach(function(value){
//       if(!counts[value]) {
//           counts[value] = 0;
//       }
//       counts[value]++;
//   });

//   return Object.keys(counts).sort(function(curKey,nextKey) {
//       return counts[curKey] < counts[nextKey];
//   });
// }

// function load_quagga(){
//   if ($('#barcode-scanner').length > 0 && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {

//     var last_result = [];
//     if (Quagga.initialized == undefined) {
//       Quagga.onDetected(function(result) {
//         var last_code = result.codeResult.code;
//         last_result.push(last_code);
//         if (last_result.length > 20) {
//           code = order_by_occurrence(last_result)[0];
//           last_result = [];
//           Quagga.stop();
//           $.ajax({
//             type: "POST",
//             url: '/products/get_barcode',
//             data: { upc: code }
//           });
//         }
//       });
//     }

//     Quagga.init({
//       inputStream : {
//         name : "Live",
//         type : "LiveStream",
//         numOfWorkers: navigator.hardwareConcurrency,
//         target: document.querySelector('#barcode-scanner')  
//       },
//       decoder: {
//           readers : ['ean_reader','ean_8_reader','code_39_reader','code_39_vin_reader','codabar_reader','upc_reader','upc_e_reader']
//       }
//     },function(err) {
//         if (err) { console.log(err); return }
//         Quagga.initialized = true;
//         Quagga.start();
//     });

//   }
// };
// $(document).on('turbolinks:load', load_quagga);


















