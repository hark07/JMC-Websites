import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";
import Hero from "../model/Hero.js";

export const createHero = async (req, res) => {
  try {
    // Only one hero allowed
    const existingHero = await Hero.findOne();

    if (existingHero) {
      return res.status(400).json({
        success: false,
        message: "Only one Hero is allowed. Delete the existing Hero first.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image required",
      });
    }

    const hero = await Hero.create({
      badge: req.body.badge,
      title: req.body.title,
      subtitle: req.body.subtitle,
      image: req.file.path,
      public_id: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Hero created successfully",
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,

      count: heroes.length,

      data: heroes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getHeroById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }

    res.json({
      success: true,

      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateHero = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }

    hero.badge = req.body.badge || hero.badge;

    hero.title = req.body.title || hero.title;

    hero.subtitle = req.body.subtitle || hero.subtitle;

    if (req.file) {
      await cloudinary.uploader.destroy(hero.public_id);

      hero.image = req.file.path;

      hero.public_id = req.file.filename;
    }

    await hero.save();

    res.json({
      success: true,

      message: "Hero updated",

      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }

    await cloudinary.uploader.destroy(hero.public_id);

    await hero.deleteOne();

    res.json({
      success: true,

      message: "Hero deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
