const queue = [];
let isProcessing = false;

const addToNotificationQueue = async (notification) => {
  queue.push(notification);
  if (!isProcessing) {
    processQueue();
  }
};

const processQueue = async () => {
  if (isProcessing || queue.length === 0) return;

  isProcessing = true;
  
  while (queue.length > 0) {
    const notification = queue.shift();
    try {
      await sendNotification(notification);
      console.log('Notification sent:', notification);
    } catch (error) {
      console.error('Failed to send notification:', error);
      // Optionally retry or move to dead letter queue
    }
  }

  isProcessing = false;
};

const sendNotification = async (notification) => {
  // Simulate notification sending (email, SMS, push notification)
  // In a real application, integrate with email service, SMS gateway, or push notification service
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sending ${notification.type} to user ${notification.userId}: ${notification.message}`);
      resolve();
    }, 1000); // Simulate network delay
  });
};

const getQueueStatus = () => {
  return {
    pending: queue.length,
    isProcessing
  };
};

module.exports = {
  addToNotificationQueue,
  getQueueStatus,
  processQueue
};