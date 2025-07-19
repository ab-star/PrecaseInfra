"use client";
import React from "react";
const IndianFlagWithPole = () => (
  <div
    className="flex flex-col items-start justify-end relative overflow-visible"
    style={{
      width: "100%",
      minHeight: 480,
      isolation: 'isolate',
      alignItems: 'flex-start',
      paddingLeft: '3.5rem',
      paddingTop: '3.5rem',
      paddingBottom: '2.5rem',
      marginRight: 'auto',
      boxShadow: "0 8px 32px 0 #8886, 0 0 0 4px #fff8 inset",
      borderRadius: 18,
      background: "url('/lightGreenGranite.jpg') center/cover, #f3f4f6"
    }}
  >
    {/* Pole with ball and flag visually attached to platform */}
    <div className="relative flex flex-col items-center" style={{ height: 400, zIndex: 2, alignItems: 'flex-start', marginBottom: '-32px' }}>
      {/* Pole group: flag, ball, and pole all aligned */}
      <div style={{ position: 'relative', height: 400, width: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Ball on top */}
        <div
          style={{
            width: 22,
            height: 22,
            background: "radial-gradient(circle at 60% 40%, #fffbe6 70%, #bfa76a 100%)",
            borderRadius: "50%",
            boxShadow: "0 2px 8px 0 #bfa76a99, 0 0 0 2px #bfa76a inset",
            position: "absolute",
            top: -11,
            left: '350%',
            transform: 'translateX(-50%)',
            zIndex: 60
          }}
        />
        {/* Flag attached to pole */}
        <div
          style={{
            position: 'absolute',
            top: "-2rem",
            left: '7rem',
            transform: 'translateX(0)',
            width: 180,
            height: 200,
            zIndex: 50,
            overflow: 'visible',
            marginLeft: 8
          }}
        >
          <img
            src="https://fujisilvertech.com/wp-content/themes/fujisilvertech/assets/img/indian-flag.gif"
            alt="Indian Flag"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              boxShadow: "0 2px 8px 0 #0002",
              display: 'block'
            }}
            draggable={false}
          />
        </div>
        {/* Steel pole, bottom flush with platform */}
        <div
          style={{
            width: 10,
            height: 400,
            background: "linear-gradient(180deg, #e0e0e0 0%, #b0b0b0 100%)",
            borderRadius: 5,
            boxShadow: "0 0 8px 0 #8888, 0 0 0 1px #aaa inset",
            zIndex: 40,
            position: 'absolute',
            left: '350%',
            transform: 'translateX(-50%)',
            bottom: 0
          }}
        />
      </div>
    </div>
    {/* Platform for flag - wide, concrete, with text slot, and a right-side stem */}
    <div style={{ position: 'relative', width: 'min(100vw, 1200px)', minWidth: 600, marginTop: 24, marginBottom: 8, zIndex: 10, display: 'flex', alignItems: 'flex-end', marginLeft: 0, left: 0 }}>
      {/* Main platform */}
      <div
        className="flex flex-col justify-center items-center"
        style={{
          flex: 1,
          minHeight: 160,
          background: "url('/concrete_texture.jpg') center/cover no-repeat, #e0e0e0",
          borderRadius: 0,
          boxShadow: "0 4px 24px 0 #8886, 0 0 0 2px #fff8 inset",
          padding: '1.5rem 2.5rem',
          fontWeight: 600,
          fontSize: '1.15rem',
          color: '#333',
          letterSpacing: 0.2,
          textAlign: 'center',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 160
        }}
      >
        Empowering Infrastructure with Precast Solutions: Our advanced precast concrete technology ensures faster construction, superior quality, and long-lasting durability for projects across India. Experience innovation, efficiency, and reliability with every build.
      </div>
      {/* Step platform on the right */}
      <div
        style={{
          width: 480,
          height: 54,
          background: "url('/concrete_texture.jpg') center/cover no-repeat, #b0b0b0",
          borderRadius: 0,
          marginLeft: 0,
          marginBottom: 0,
          alignSelf: 'flex-end',
          boxShadow: "0 4px 12px 0 #8886, 0 0 0 1px #fff8 inset",
          // border removed
          // borderLeft removed
          zIndex: 11,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      />
    </div>
  </div>
);

export default IndianFlagWithPole;