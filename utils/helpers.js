import React from 'react';
import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Constants from 'expo-constants';


const NOTIFICATION_KEY = 'Flashcard:notifications';

//This is needed for creating android notifications
const NOTIFICATION_CHANNEL_ID = 'flash_card_notification_channel_id';

export const clearLocalNotification=()=> (AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync));


const createNotification=()=> ({
    title: 'Study Practice Reminder',
    body: "One quiz every day keeps the doctor away",
    ios: {
      sound: true
    },
    android: {
      channelId: NOTIFICATION_CHANNEL_ID,
      sticky: false,
      color: 'red'
    }
})
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (Constants.isDevice && status === 'granted') {
            Notifications.createChannelAndroidAsync(NOTIFICATION_CHANNEL_ID, {
              name: 'Flash Reminder',
              description: 'This is a gentle reminder for you to study today',
              sound: true,
              priority: 'high'
            }).then(() => {
                Notifications.cancelAllScheduledNotificationsAsync();
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day'
                  }
                );
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch(error => {
                console.log('error', error);
              });
          }
        });
      }
    });
}