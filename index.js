const WindowsBalloon = require('node-notifier').WindowsBalloon;

const notifier = new WindowsBalloon({
    withFallback: false, // Try Windows Toast and Growl first?
    customPath: undefined // Relative/Absolute path if you want to use your fork of notifu
});

async function doNotification(title, message) {

    notifier.notify(
        {
            title: title,
            message: message,
            sound: false, // true | false.
            time: 5000, // How long to show balloon in ms
            wait: false, // Wait for User Action against Notification
            type: 'info' // The notification type : info | warn | error
        },
        function (error, response) {
            console.log(error || '', response || '');
        }
    );
}

async function main() {
    while (true) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
            console.log(`[${new Date().toLocaleString()}] Checking...`);
            const res = await
                fetch("https://gql.tokopedia.com/graphql/logisticTracking", {// REPLACE FROM HERE
                "headers": {
                },
                "body": "",
                "method": "POST"
            });//TO HERE
            const datas = await res.json();
            for(const data of datas){
                handleData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
const database = {}

function handleData(data){
    //data.logistic_tracking.data.track_order
    if(data.data && data.data.logistic_tracking && data.data.logistic_tracking.data && data.data.logistic_tracking.data.track_order){
        const track_order = data.data.logistic_tracking.data.track_order
        //[0].data.logistic_tracking.data.track_order.track_history
        //if the length of track_history is different from previous from database
        //or we got a new track_history
        const needNotif = !database[track_order.shipping_ref_num] || database[track_order.shipping_ref_num].track_history.length != track_order.track_history.length;
        database[track_order.shipping_ref_num] = track_order
        if(needNotif){
            //we got a new track_history
            const new_track_history = track_order.track_history[0]
            //alert
            const title = new_track_history.city
            const message =  new_track_history.date_time + " " + new_track_history.status
            doNotification(title, message)
        }


    }else{
        console.log("Expected data.logistic_tracking.data.track_order but got: ", data)
    }

}

main()
