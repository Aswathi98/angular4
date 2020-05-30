import { delay } from "rxjs/operator/delay";

(function ($) {
    var firstSeatLabel = 1;

    $.fn.loadSeatMap = function (data , test) {
       

        var $cart = $('#selected-seats'),
            $counter = $('#counter'),
            $total = $('#total'),
            sc = $('#seat-map').seatCharts(test, {
                // map: [

                //     'f[G40,G40]f[G45,G45]f[G50,G50]f[G57,G57]_f[H20,H20]f[H27,H27]f[H34,H34]f[H41,H41]_f[I60,I60]f[I63,I63]f[I66,I66]f[I69,I69]',
                //     'f[G41,G41]f[G46,G46]f[G51,G51]f[G58,G58]_f[H21,H21]f[H28,H28]f[H35,H35]f[H42,H42]_f[I61,I61]f[I64,I64]f[I67,I67]f[I70,I70]',
                //     'f[G42,G42]f[G47,G47]f[G52,G52]f[G59,G59]_f[H22,H22]f[H29,H29]f[H36,H36]f[H43,H43]_f[I62,I62]f[I65,I65]f[I68,I68]f[I71,I71]',
                //     'f[G43,G43]f[G48,G48]f[G53,G53]f[G60,G60]_f[H23,H23]f[H30,H30]f[H37,H37]f[H44,H44]_____',
                //     'f[G44,G44]f[G49,G49]f[G54,G54]f[G61,G61]_f[H24,H24]f[H31,H31]f[H38,H38]f[H45,H45]_f[J30,J30]f[J33,J33]f[J36,J36]f[J39,J39]',
                //     '__f[G55,G55]f[G62,G62]_f[H25,H25]f[H32,H32]f[H39,H39]f[H46,H46]_f[J31,J31]f[J34,J34]f[J37,J37]f[J40,J40]',
                //     '__f[G56,G56]f[G63,G63]_f[H26,H26]f[H33,H33]f[H40,H40]f[H47,H47]_f[J32,J32]f[J35,J35]f[J38,J38]f[J41,J41]'
                // ],
                map:data,
                seats: {
                    n: {

                        classes: 'Empty', //your custom CSS class
                        category: 'First Class'
                    },
                    b: {

                        classes: 'Operations', //your custom CSS class
                        category: 'Economy Class'
                    },
                    d: {

                        classes: 'Mains', //your custom CSS class
                        category: 'Economy Class'
                    },
                    a: {

                        classes: 'Chains', //your custom CSS class
                        category: 'Economy Class'
                    },
                    c: {

                        classes: 'Services', //your custom CSS class
                        category: 'Economy Class'
                    },
                    e: {

                        classes: 'Kites', //your custom CSS class
                        category: 'Economy Class'
                    },
                    f: {

                        classes: 'Amex', //your custom CSS class
                        category: 'Economy Class'
                    },

                },
                naming: {
                    top: false,
                    left: false
                },
                legend: {
                    node: $('#legend'),
                    items: [
                        ['f', 'unavailable', 'Expedia-Amex'],
                        ['e', 'unavailable', 'Expedia-Kites'],
                        ['a', 'unavailable', 'Expedia-Chains'],
                       ['b', 'unavailable', 'iCargo-Operations'],
                        ['c', 'unavailable', 'iCargo-Services'],
                        ['a', 'unavailable', 'iCargo-Mains'],
                    ]
                },

                click: function () {

                       

                    if (this.status() == 'available') {

                        // sc.find('available').node().siblings('input:checkbox').prop('checked', false);
                        // $(this).siblings('input:checkbox').prop('checked', false);

                        //let's create a new <li> which we'll add to the cart items
                        $('<li>' + ' Seat Selected ' + '<button class="btn btn-danger">' + this.settings.label + '</button>' + '<a href="spacemap" class="cancel-cart-item">[cancel]</a> </li>')
                            .attr('id', 'cart-item-' + this.settings.id)
                            .data('seatId', this.settings.id)
                            .appendTo($cart);

                        //  sc.find('available').status('unavailable');

                        /*
                         * Lets update the counter and total
                         *
                         * .find function will not find the current seat, because it will change its stauts only after return
                         * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                         */
                        $counter.text(sc.find('selected').length + 1);
                        $total.text(recalculateTotal(sc) + this.data().price);

                        return 'selected';
                        
            
                    } else if (this.status() == 'selected') {
                        //update the counter
                        $counter.text(sc.find('selected').length - 1);
                        //and total
                        $total.text(recalculateTotal(sc) - this.data().price);

                        //remove the item from our cart
                        $('#cart-item-' + this.settings.id).remove();
                        // sc.find('available').status('available');
                        //seat has been vacated
                        return 'available';
                    } else if (this.status() == 'unavailable') {
                        //seat has been already booked
                        return 'unavailable';
                    } else {
                        return this.style();
                    }
                }
            });

        //this will handle "[cancel]" link clicks
        $('#selected-seats').on('click', '.cancel-cart-item', function () {
            //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
            sc.get($(this).parents('li:first').data('seatId')).click();

        });
        // $('#selected-seats').change( function () {
        //     sc.find('selected').status('available');
        //     // $('.seat-map').not(this).prop('checked', false);
        // });
        // sc.find('sc').node().siblings('input:checkbox').prop('checked', false);
        // $(this).siblings('input:checkbox').prop('checked', false);

        // sc.find('unavailable').status('available');

        //let's pretend some seats have already been booked
        //   sc.get(['selectedseat']).status('unavailable');
        //   sc.find(['G40']).node().fadeTo("slow",0.40);
        $('p').click(function () {
            sc.find('unavailable').node().fadeTo("slow", 0.40);
        });
        $('#show').click(function () {
            sc.find('unavailable').node().fadeTo("fast", 1);
        });

    }

    function recalculateTotal(sc) {
        var total = 0;

        //basically find every selected seat and sum its price
        sc.find('selected').each(function () {
            total += this.data().price;
        });

        return total;
    }

    

    
})(jQuery);
