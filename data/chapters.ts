// Chapter content data — extracted from reference/existing-ui.tsx
// Diagrams are imported from components/diagrams/index.tsx and injected at runtime.

import type { SubsectionDiagram } from "@/components/chapter/SubsectionPanel";
import type { CheckpointTestData } from "@/components/question/CheckpointTest";

export interface ChapterData {
  id: number;
  title: string;
  summary: string;
  subsections: Array<{
    title: string;
    objectives: string[];
    diagrams: SubsectionDiagram[];
    content: string;
    examples: Array<{ title: string; steps: string[] }>;
    questions: Array<{ q: string; solution: string }>;
  }>;
  checkpoint: CheckpointTestData;
}

// Diagrams are injected lazily to avoid importing React in a data file.
// Components that use chapters should map diagram keys to SVG elements using DIAGRAM_MAP.
export type DiagramKey =
  | "siUnits"
  | "vectorResolution"
  | "svtGraphs"
  | "projectile"
  | "momentDiagram"
  | "energyConservation"
  | "stressStrain"
  | "waveDiagram"
  | "superposition"
  | "circuitSymbols"
  | "seriesParallel"
  | "atomModel";

export interface RawSubsection {
  title: string;
  objectives: string[];
  diagramKeys: DiagramKey[];
  diagramLabels: string[];
  content: string;
  examples: Array<{ title: string; steps: string[] }>;
  questions: Array<{ q: string; solution: string }>;
}

export interface RawChapter {
  id: number;
  title: string;
  summary: string;
  subsections: RawSubsection[];
  checkpoint: CheckpointTestData;
}

export const RAW_CHAPTERS: RawChapter[] = [
  {
    id: 1,
    title: "Physical Quantities & Units",
    summary:
      "Physics is built on precise measurement. This chapter introduces the SI system, dimensional analysis, scalars and vectors, and experimental uncertainty.",
    subsections: [
      {
        title: "1.1 Physical Quantities and SI Units",
        objectives: [
          "Recall the seven SI base quantities and their units",
          "Use SI prefixes and convert between them",
          "Express derived units in SI base units",
        ],
        diagramKeys: ["siUnits"],
        diagramLabels: ["The Seven SI Base Quantities"],
        content:
          'All physical quantities have a **numerical magnitude** and a **unit**. The SI system defines seven base quantities. A **derived unit** is formed by combining base units — e.g. force (N) $= kg\\,m\\,s^{-2}$, pressure (Pa) $= kg\\,m^{-1}\\,s^{-2}$, energy (J) $= kg\\,m^{2}\\,s^{-2}$.\n\nPrefixes avoid writing extreme numbers: nano ($10^{-9}$), micro ($10^{-6}$), milli ($10^{-3}$), kilo ($10^3$), mega ($10^6$), giga ($10^9$).',
        examples: [
          {
            title: "Expressing a derived unit in base units",
            steps: [
              "Express the joule (J) in SI base units.",
              "$J = N\\cdot m$, and $N = kg\\,m\\,s^{-2}$",
              "Therefore $J = kg\\,m^{2}\\,s^{-2}$ ✓",
            ],
          },
        ],
        questions: [
          {
            q: "State the SI unit of force and express it in terms of base units.",
            solution: "The Newton (N). $N = kg\\cdot m\\cdot s^{-2}$",
          },
          {
            q: "Convert $450\\,nm$ to metres in standard form.",
            solution: "$450\\times10^{-9}\\,m = 4.50\\times10^{-7}\\,m$",
          },
          {
            q: "Express the unit of pressure (Pa) in SI base units.",
            solution: "$Pa = N/m^2 = kg\\,m^{-1}\\,s^{-2}$",
          },
          {
            q: "Identify the base SI quantities: force, length, temperature, velocity, current.",
            solution:
              "Base quantities: **length**, **temperature**, **current**. Force and velocity are derived.",
          },
          {
            q: "Convert $3.6\\,\\mu A$ to amperes.",
            solution: "$3.6\\times10^{-6}\\,A$",
          },
        ],
      },
      {
        title: "1.2 Scalars and Vectors",
        objectives: [
          "Distinguish scalar and vector quantities",
          "Add coplanar vectors graphically",
          "Resolve a vector into perpendicular components",
        ],
        diagramKeys: ["vectorResolution"],
        diagramLabels: ["Resolving a Vector into Components"],
        content:
          "A **scalar** has magnitude only (mass, speed, temperature). A **vector** has magnitude and direction (force, velocity, displacement).\n\nTo add vectors: place **head-to-tail** — the resultant goes from the tail of the first to the head of the last (triangle law).\n\nResolution: a vector $F$ at angle $\\theta$ to horizontal splits into $F_x = F\\cos\\theta$ and $F_y = F\\sin\\theta$.",
        examples: [
          {
            title: "Finding resultant of two perpendicular forces",
            steps: [
              "6 N east and 8 N north.",
              "$R = \\sqrt{6^2+8^2} = 10\\,N$",
              "$\\theta = \\arctan(8/6) \\approx 53°$ north of east",
            ],
          },
        ],
        questions: [
          {
            q: "A force of 12 N acts at 30° above horizontal. Find its horizontal and vertical components.",
            solution:
              "$F_x = 12\\cos30° \\approx 10.4\\,N$, $F_y = 12\\sin30° = 6.0\\,N$",
          },
          {
            q: "Two forces of 5 N and 12 N act at right angles. Find the resultant magnitude and direction.",
            solution:
              "$R = \\sqrt{169} = 13\\,N$; $\\theta = \\arctan(5/12) \\approx 22.6°$ from the 12 N force",
          },
          {
            q: "State two examples each of scalar and vector quantities.",
            solution: "Scalars: mass, temperature. Vectors: force, velocity.",
          },
          {
            q: "A displacement of 10 m acts at 60° to the x-axis. Find x and y components.",
            solution:
              "$x = 10\\cos60° = 5.0\\,m$; $y = 10\\sin60° \\approx 8.66\\,m$",
          },
          {
            q: "Explain why velocity is a vector but speed is a scalar.",
            solution:
              "Speed is the magnitude of motion with no direction. Velocity specifies both the magnitude and direction of motion.",
          },
        ],
      },
      {
        title: "1.3 Measurement and Uncertainties",
        objectives: [
          "Distinguish systematic and random errors",
          "Express uncertainty as absolute and percentage",
          "Combine uncertainties in calculations",
        ],
        diagramKeys: [],
        diagramLabels: [],
        content:
          "**Random errors** cause scatter; reduced by averaging. **Systematic errors** cause consistent offset; cannot be reduced by repetition.\n\nCombining uncertainties:\n- Add/subtract: add **absolute** uncertainties\n- Multiply/divide: add **percentage** uncertainties\n- Power $z=a^n$: % uncertainty in $z = n \\times$ % uncertainty in $a$",
        examples: [
          {
            title: "Combining uncertainties",
            steps: [
              "$v = d/t$, $d=(2.50\\pm0.02)\\,m$, $t=(0.80\\pm0.02)\\,s$",
              "$v = 3.125\\,m\\,s^{-1}$",
              "% uncertainty: $\\frac{0.02}{2.50}\\times100 + \\frac{0.02}{0.80}\\times100 = 0.8+2.5 = 3.3\\%$",
              "Absolute: $3.3\\%\\times3.125\\approx0.10$",
              "Result: $(3.1\\pm0.1)\\,m\\,s^{-1}$",
            ],
          },
        ],
        questions: [
          {
            q: "A mass is $(4.52\\pm0.05)\\,kg$. Calculate the percentage uncertainty.",
            solution: "$\\frac{0.05}{4.52}\\times100 \\approx 1.1\\%$",
          },
          {
            q: "$l_1=(3.4\\pm0.1)\\,cm$, $l_2=(2.1\\pm0.1)\\,cm$. State $l_1+l_2$ with uncertainty.",
            solution: "$(5.5\\pm0.2)\\,cm$",
          },
          {
            q: "Distinguish systematic from random error with one example each.",
            solution:
              "Random: reaction-time scatter when timing. Systematic: zero error on a balance.",
          },
          {
            q: "$L=(0.40\\pm0.01)\\,m$. Find % uncertainty in $L^2$.",
            solution:
              "% in $L = 2.5\\%$; % in $L^2 = 2\\times2.5 = 5.0\\%$",
          },
          {
            q: "Five readings: 1.23, 1.25, 1.22, 1.24, 1.21 s. Find the mean and estimate uncertainty.",
            solution:
              "Mean $= 1.23\\,s$; range $= 0.04\\,s$; uncertainty $\\approx 0.02\\,s$; result $(1.23\\pm0.02)\\,s$",
          },
        ],
      },
    ],
    checkpoint: {
      questions: [
        {
          id: "c1q1",
          stem: "Define what is meant by a physical quantity.",
          marks: 2,
          solution:
            "A physical quantity is something that can be measured [1]. It consists of a numerical magnitude and a unit [1].",
        },
        {
          id: "c1q2",
          stem: "The speed of light is $3.00\\times10^8\\,m\\,s^{-1}$.",
          parts: [
            {
              q: "Express this speed in km per hour.",
              marks: 3,
              solution:
                "$3.00\\times10^8\\times3600 = 1.08\\times10^{12}\\,m\\,hr^{-1}$; divide by 1000: $1.08\\times10^9\\,km\\,hr^{-1}$ [3]",
            },
            {
              q: "State the SI base units of speed.",
              marks: 1,
              solution: "$m\\,s^{-1}$ [1]",
            },
          ],
        },
        {
          id: "c1q3",
          stem: "A force $F$ is given by $F = mv^2/r$. Use base units to show that this equation is homogeneous.",
          marks: 3,
          solution:
            "LHS: $N = kg\\,m\\,s^{-2}$. RHS: $\\frac{kg\\cdot(m\\,s^{-1})^2}{m} = kg\\,m\\,s^{-2}$ [3]. Units match.",
        },
        {
          id: "c1q4",
          stem: "A student measures the diameter of a wire with a micrometer. Five readings (mm): 1.23, 1.25, 1.24, 1.22, 1.26.",
          parts: [
            {
              q: "Calculate the mean diameter and uncertainty.",
              marks: 3,
              solution:
                "Mean $= 1.24\\,mm$ [1]; range $= 0.04\\,mm$; uncertainty $= 0.02\\,mm$ [1]; result $(1.24\\pm0.02)\\,mm$ [1].",
            },
            {
              q: "Calculate the percentage uncertainty in the cross-sectional area $A=\\pi r^2$.",
              marks: 2,
              solution:
                "% in $r = 1.6\\%$ [1]; % in $A = 2\\times1.6 = 3.2\\%$ [1].",
            },
          ],
        },
        {
          id: "c1q5",
          stem: "A vector $P$ of magnitude 15 N acts at 55° above horizontal. A second vector $Q$ of magnitude 8 N acts horizontally.",
          parts: [
            {
              q: "Calculate the horizontal and vertical components of $P$.",
              marks: 2,
              solution:
                "$P_x = 15\\cos55° = 8.60\\,N$ [1]; $P_y = 15\\sin55° = 12.3\\,N$ [1].",
            },
            {
              q: "Find the magnitude and direction of the resultant of $P$ and $Q$.",
              marks: 4,
              solution:
                "Horizontal: $8.60+8=16.6\\,N$ [1]. Vertical: $12.3\\,N$ [1]. $R=\\sqrt{16.6^2+12.3^2}=20.7\\,N$ [1]. $\\theta=\\arctan(12.3/16.6)=36.5°$ above horizontal [1].",
            },
          ],
        },
      ],
    },
  },
  // Chapters 2–11 follow the same pattern.
  // For brevity, they are included as stubs here —
  // a full seed script (prisma/seed.ts) would populate the database.
  {
    id: 2,
    title: "Kinematics",
    summary:
      "Kinematics describes motion. This chapter covers displacement, velocity, acceleration, SUVAT equations, graphical analysis, and projectile motion.",
    subsections: [
      {
        title: "2.1 Equations of Uniform Motion",
        objectives: [
          "Define displacement, velocity and acceleration",
          "Use the SUVAT equations",
          "Interpret s–t and v–t graphs",
        ],
        diagramKeys: ["svtGraphs"],
        diagramLabels: ["Displacement–Time and Velocity–Time Graphs"],
        content:
          "For **uniform acceleration**, the four SUVAT equations are:\n$$v = u+at \\qquad s = ut+\\tfrac{1}{2}at^2 \\qquad v^2 = u^2+2as \\qquad s = \\tfrac{1}{2}(u+v)t$$\n\nOn a **v–t graph**: gradient = acceleration; area = displacement.\nOn an **s–t graph**: gradient = velocity; curve means acceleration.",
        examples: [
          {
            title: "Using SUVAT",
            steps: [
              "Car starts from rest, $a=3.0\\,m\\,s^{-2}$, $t=6.0\\,s$. Find $s$.",
              "$s = ut+\\frac{1}{2}at^2 = 0+\\frac{1}{2}(3.0)(36) = 54\\,m$",
            ],
          },
        ],
        questions: [
          {
            q: "A car accelerates from rest at $2.5\\,m\\,s^{-2}$ for 8.0 s. Calculate the distance.",
            solution: "$s = \\frac{1}{2}(2.5)(64) = 80\\,m$",
          },
          {
            q: "A ball is thrown upward at 15 m/s. Find maximum height. $(g=9.81\\,m\\,s^{-2})$",
            solution: "$v^2=u^2-2gs \\Rightarrow s = 225/19.62 \\approx 11.5\\,m$",
          },
          {
            q: "A v–t graph shows a horizontal line at 8.0 m/s for 5.0 s. State acceleration and find displacement.",
            solution: "Acceleration $= 0$; displacement $= 8.0\\times5.0 = 40\\,m$",
          },
          {
            q: "A train decelerates from 30 m/s to rest over 500 m. Find the deceleration.",
            solution:
              "$v^2=u^2+2as \\Rightarrow a = -900/1000 = -0.90\\,m\\,s^{-2}$",
          },
          {
            q: "What does a decreasing gradient on an s–t graph represent?",
            solution: "Decreasing velocity — the object is decelerating.",
          },
        ],
      },
      {
        title: "2.2 Projectile Motion",
        objectives: [
          "Describe horizontal and vertical independence in projectile motion",
          "Solve problems for projectiles",
          "Describe the parabolic trajectory",
        ],
        diagramKeys: ["projectile"],
        diagramLabels: ["Projectile Motion"],
        content:
          "In projectile motion (no air resistance):\n- **Horizontal**: no force → constant velocity $u_x = u\\cos\\theta$\n- **Vertical**: gravity acts → $a = g = 9.81\\,m\\,s^{-2}$ downward\n\nAt the highest point $v_y = 0$. Time of flight is found from vertical motion; range $R = u_x \\times t_{flight}$.",
        examples: [
          {
            title: "Projectile launched at an angle",
            steps: [
              "$u=20\\,m\\,s^{-1}$ at $30°$. Find range.",
              "$u_y = 20\\sin30° = 10\\,m\\,s^{-1}$; $u_x = 20\\cos30° = 17.3\\,m\\,s^{-1}$",
              "$T = 2u_y/g = 2.04\\,s$",
              "$R = 17.3\\times2.04 \\approx 35\\,m$",
            ],
          },
        ],
        questions: [
          {
            q: "A ball is launched horizontally at 8.0 m/s from 45 m height. How far does it land from the base?",
            solution: "$t=\\sqrt{90/9.81}=3.03\\,s$; $x=8.0\\times3.03\\approx24\\,m$",
          },
          {
            q: "Explain why horizontal and vertical components of projectile motion are independent.",
            solution:
              "No horizontal force acts (gravity is purely vertical). Perpendicular directions cannot affect each other.",
          },
          {
            q: "A projectile is launched at 25 m/s at 40°. Find vertical initial velocity and time to maximum height.",
            solution:
              "$u_y=25\\sin40°=16.1\\,m\\,s^{-1}$; $t=16.1/9.81\\approx1.64\\,s$",
          },
          {
            q: "At what point does a projectile have minimum speed? Explain.",
            solution:
              "At the highest point — $v_y=0$, so only the constant horizontal component $u_x$ remains.",
          },
          {
            q: "A ball is kicked at 18 m/s at 35°. Calculate the horizontal range.",
            solution:
              "$u_x=14.75$, $u_y=10.32$, $T=2.10\\,s$, $R=14.75\\times2.10\\approx31\\,m$",
          },
        ],
      },
    ],
    checkpoint: {
      questions: [
        {
          id: "c2q1",
          stem: "Define acceleration and state its SI unit.",
          marks: 2,
          solution:
            "Acceleration is the rate of change of velocity [1]. SI unit: $m\\,s^{-2}$ [1].",
        },
        {
          id: "c2q2",
          stem: "A car travelling at $18\\,m\\,s^{-1}$ brakes uniformly and stops in $4.5\\,s$.",
          parts: [
            {
              q: "Calculate the deceleration.",
              marks: 2,
              solution:
                "$a=(0-18)/4.5=-4.0\\,m\\,s^{-2}$; deceleration $=4.0\\,m\\,s^{-2}$ [2].",
            },
            {
              q: "Calculate the distance travelled during braking.",
              marks: 2,
              solution: "$s=\\frac{1}{2}(18+0)(4.5)=40.5\\,m$ [2].",
            },
            {
              q: "Sketch a velocity–time graph. Label axes and mark initial velocity.",
              marks: 2,
              solution:
                "Straight line from $(0,18)$ to $(4.5,0)$ [1]. Both axes labelled with units [1].",
            },
          ],
        },
        {
          id: "c2q3",
          stem: "A ball is thrown horizontally at $12\\,m\\,s^{-1}$ from a building of height $80\\,m$. $(g=9.81\\,m\\,s^{-2})$",
          parts: [
            {
              q: "Show that the ball takes approximately 4.0 s to reach the ground.",
              marks: 2,
              solution:
                "$t=\\sqrt{2\\times80/9.81}=\\sqrt{16.3}=4.04\\approx4.0\\,s$ [2].",
            },
            {
              q: "Calculate the horizontal distance from the base.",
              marks: 2,
              solution: "$x=12\\times4.04=48.5\\,m$ [2].",
            },
            {
              q: "Calculate the speed just before impact.",
              marks: 3,
              solution:
                "$v_y=9.81\\times4.04=39.6\\,m\\,s^{-1}$ [1]; $v=\\sqrt{12^2+39.6^2}\\approx41.4\\,m\\,s^{-1}$ [2].",
            },
          ],
        },
        {
          id: "c2q4",
          stem: "Explain the difference between distance and displacement, and between speed and velocity.",
          marks: 3,
          solution:
            "Distance is scalar — total path length [1]. Displacement is vector — straight-line distance with direction [1]. Speed is magnitude of velocity; velocity includes direction [1].",
        },
      ],
    },
  },
];

// Re-export a type that includes resolved diagrams for use in components
export type { SubsectionDiagram };

// Build CHAPTERS by injecting diagrams from the diagram map.
// This is done at import time so pages just import CHAPTERS.
import { DIAGRAM_MAP } from "@/components/diagrams";

export const CHAPTERS: ChapterData[] = RAW_CHAPTERS.map((ch) => ({
  ...ch,
  subsections: ch.subsections.map((sub) => ({
    ...sub,
    diagrams: sub.diagramKeys.map((key, i) => ({
      label: sub.diagramLabels[i] ?? "",
      svg: DIAGRAM_MAP[key],
    })),
  })),
}));
