// controllers/notificationController.js
const Notification = require("../models/Notification");

// @desc    Create a new notification
// @route   POST /api/notifications
// @access  Private
exports.createNotification = async (req, res) => {
  try {
    const { recipient, message, type, relatedIncident } = req.body;

    const notification = new Notification({
      recipient,
      message,
      type,
      relatedIncident,
    });

    await notification.save();

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all notifications for a user
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Mark a notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Check if the notification belongs to the user
    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Check if the notification belongs to the user
    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await notification.remove();

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};