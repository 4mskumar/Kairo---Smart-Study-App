import { Revision } from "../models/revisionSchema.js";

// helper
const getDateRange = (daysAhead = 0) => {
  const now = new Date();
  const end = new Date();
  end.setDate(now.getDate() + daysAhead);
  return { now, end };
};

/**
 * 🔔 Overdue revisions
 */
export const getOverdueRevisions = async (req, res) => {
  try {
    const { userId } = req.query;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const revisions = await Revision.find({
      userId,
      completed: false,
      dueDate: { $lt: today },
    }).sort({ dueDate: 1 });

    res.json({ success: true, revisions });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};


/**
 * 📅 Due today
 */
export const getTodayRevisions = async (req, res) => {
  try {
    const { userId } = req.query;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    console.log(start, end);
    

    const revisions = await Revision.find({
      user : userId,
      completed: false,
      dueDate: { $gte: start, $lte: end },
    }).sort({ dueDate: 1 });

    res.json({ success: true, revisions });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};


/**
 * ⏳ Upcoming (next 7 days)
 */
export const getUpcomingRevisions = async (req, res) => {
  try {
    const { userId } = req.query;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setDate(start.getDate() + 7);
    end.setHours(23, 59, 59, 999);

    const revisions = await Revision.find({
      user : userId,
      completed: false,
      dueDate: { $gt: start, $lte: end },
    }).sort({ dueDate: 1 });
    console.log(revisions);
    

    res.json({ success: true, revisions });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};


/**
 * ✅ Mark revision completed
 */
export const completeRevision = async (req, res) => {
  try {
    const { id } = req.params;

    await Revision.findByIdAndUpdate(id, {
      completed: true,
      completedAt: new Date(),
    });

    res.json({ success: true, message: "Revision completed" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};


export const debugAllRevisions = async (req, res) => {
  const { userId } = req.query;

  const revisions = await Revision.find({ user : userId }).lean();

  return res.json({
    count: revisions.length,
    revisions: revisions.map(r => ({
      dueDate: r.dueDate,
      iso: r.dueDate?.toISOString?.(),
      completed: r.completed,
      now: new Date().toISOString(),
    })),
  });
};

``