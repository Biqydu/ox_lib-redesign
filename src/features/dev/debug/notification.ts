import { NotificationProps } from '../../../typings';
import { debugData } from '../../../utils/debugData';

export const debugCustomNotification = () => {
  debugData<NotificationProps>([
    // {
    //   action: 'notify',
    //   data: {
    //     title: 'Success',
    //     description: 'Notification description',
    //     type: 'success',
    //     id: 'pogchamp',
    //     duration: 20000,
    //     style: {
    //       '.description': {
    //         color: 'red',
    //       },
    //     },
    //   },
    // },
  ]);
  debugData<NotificationProps>([
    {
      action: 'notify',
      data: {
        title: 'Error',
        description: 'Notification description',
        type: 'error',
      },
    },
    {
      action: 'notify',
      data: {
        title: 'Success',
        description: 'Notification description',
        type: 'success',
      },
    },
    {
      action: 'notify',
      data: {
        title: 'Warning',
        description: 'Notification description',
        type: 'warning',
      },
    },
    {
      action: 'notify',
      data: {
        title: 'Info',
        description: 'Notification description',
        type: 'info',
      },
    },
  ]);
  debugData<NotificationProps>([
    // {
    //   action: 'notify',
    //   data: {
    //     title: 'Custom icon success',
    //     description: 'Notification description',
    //     type: 'success',
    //     icon: 'microchip',
    //     showDuration: false,
    //   },
    // },
  ]);
};
