import React from "react";
import Hero from "../components/home/Hero";
import Faculties from "../components/home/Faculties";
import EventsNews from "../components/home/EventsNews";
import CampusChiefMessage from "../components/home/CampusChiefMessage";
import NoticesDownloads from "../components/home/NoticesDownloads";
import Program from "./Program";

function Home() {
  return (
    <>
      <Hero />
      <Faculties />
      <Program />
      <EventsNews />
      <NoticesDownloads />
      <CampusChiefMessage />
    </>
  );
}

export default Home;