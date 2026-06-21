export const portfolioData = {
  en: {
    title: "Annie Huang | Portfolio",
    logoName: "Annie Huang",
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      experiences: "Experiences",
      courses: "Courses",
      awards: "Awards & Activities",
      journal: "📝 Journal"
    },
    hero: {
      name: "Annie Huang",
      subtitles: [
        "EE | ME | Coding",
        "Design | Music | Language Learning | Taekwondo"
      ],
      aboutTitle: "About Me",
      aboutText: "I am a person with great curiosity. Since I have experienced and participated in different genres of activities, I learned new perspectives to observe the world and built up an interest to learn in an unfamiliar field. I'm also a creator, I love to build my own works. In order to express my thoughts and stories, I learned skills like languages, drawing, writing, and coding. With these skills, I'm able to step out of the comfort zone, participate in challenging activities to reach the goals and expand my scope of view."
    },
    upcoming: {
      title: "Upcoming / Future Plans",
      items: [
        { name: "Summer Internship at NSW, Kitakyushu, Japan", date: "2026.07 - 2026.08" },
        { name: "Graduate School (TBD)", date: "" }
      ]
    },
    education: {
      title: "Education",
      items: [
        {
          degree: "Bachelor Degree of Electrical Engineering / Education program",
          school: "National Taipei University of Technology (Taipei)",
          date: "Sep.2024 - Jun.2026",
          note: ""
        },
        {
          degree: "Associate Degree of Intelligent Automation Engineering",
          school: "National Taipei University of Technology (Taipei)",
          date: "Sep.2019 - Jun.2024",
          note: "🎓 Scholarship for Academic Performance in every semester"
        }
      ],
      accordionTitle: "Early Talents & Holistic Development",
      accordionSections: [
        {
          title: "Gifted & Talented Education",
          date: "2012-2019",
          paragraphs: [
            "Multi-dimensional Systems Thinking: Cultivated a habit of analyzing complex engineering challenges through multiple lenses—integrating mechanical structures, electrical control, and computer science. This enables me to identify 'Systemic Inconsistencies' and underlying inefficiencies that others might overlook.",
            "Autonomous Learning & Resource Integration: Embraces the mindset that 'The world is my classroom.' Instead of waiting for formal instructions, I am accustomed to autonomous research and integrating diverse resources to master unknown technologies, such as YOLOv10 and FPGA.",
            "Strategic Execution & Resilience: Experienced in scoping complex problems and maintaining progress under practical constraints. I have developed the resilience to iterate on ambitious ideas and the pragmatic judgment to prioritize tasks in high-pressure environments."
          ]
        },
        {
          title: "Music & Orchestral Training",
          date: "2012-2016(main)",
          paragraphs: [
            "Major in Percussion & Minor in Piano: Years of rigorous training in diverse instruments (including keyboard and battery percussion) developed high-level hand-eye coordination and the self-discipline required for mastering precision-demanding tasks.",
            "Music Theory & Aural Skills: The systematic study of music theory and ear training (Dictation) honed my pattern recognition abilities and logical analysis of abstract structures.",
            "Orchestral & Ensemble Experience: Serving in wind and string ensembles emphasized the precision of 'Teamwork.' As a percussionist, I was responsible for maintaining the pulse and stability of the group, a skill directly transferable to coordinating multiple lab users and maintaining system synchronization."
          ]
        }
      ]
    },
    projects: {
      title: "Projects",
      list: [
        {
          id: "angry-birds",
          title: "Angry Birds Replica (C++ / PTSD Engine)",
          date: "Feb.2026 - Jun.2026",
          links: [
            { text: "💻 GitHub", url: "https://github.com/Annie04082020/Angry_Birds_Replica" },
            { text: "🎥 Mid-term Demo", url: "https://youtu.be/V9pe8lg6LLU" },
            { text: "🎥 Final Demo", url: "https://youtu.be/aVP6Vbt74fo" }
          ],
          bullets: [
            "1:1 faithful replica of Angry Birds built in C++ as the semester capstone for Object-Oriented Programming Lab (OOPL 2026 Spring).",
            "Physics-based slingshot mechanics with multi-type birds (each with unique special abilities) and destructible pig fortresses made of wood, stone, and ice.",
            "Built on a custom in-house game engine (PTSD framework) — handling rendering, audio (SDL2_mixer + OGG/Vorbis), and collision detection from scratch.",
            "Applied OOP principles: inheritance hierarchies for bird/pig/block types, polymorphic ability dispatch, and component-based scene management."
          ],
          modal: {
            processTitle: "Development Process",
            process: "Collaborated as PM with a 2-person team over one semester. Designed the full game architecture — from slingshot trajectory physics, multi-stage block destruction, to bird special-ability triggers. Integrated the PTSD engine (a practical C++ 2D game framework from NTUT OSC) and extended it with game-specific systems including stage loading, score calculation, and animated particle effects.",
            detailsTitle: "Technical Highlights",
            bullets: [
              "<strong>Physics</strong>: Projectile motion with drag simulation; collision response between circular and rectangular rigid bodies.",
              "<strong>Bird Abilities</strong>: Red (standard), Yellow (speed burst), Blue (triple split), Black (explosion), White (egg drop).",
              "<strong>Block Materials</strong>: Wood / Stone / Ice — each with distinct HP, mass, and fracture animations.",
              "<strong>Audio</strong>: SDL2_mixer with OGG/Vorbis for launch SFX, collision impacts, and background music.",
              "<strong>Tools</strong>: C++17, CMake, SDL2, PTSD framework; developed on WSL Ubuntu + Windows."
            ]
          }
        },
        {
          id: "yolo-v10",
          title: "Performance Analysis of YOLO-Based Models for Contraband Image Identification on the SIXray Dataset: A Case Study on YOLOv10",
          date: "Dec 2025 – Mar 2026",
          links: [
            { text: "📄 Report PDF", url: "https://your-link-to-pdf.com/SIXrayYOLO_Report.pdf" }
          ],
          bullets: [
            "Processed SIXray dataset (1M+ X-ray images) with extreme 1:1000 class imbalance; implemented Class-Balanced Grouping and Mosaic augmentation.",
            "Trained YOLOv10 nano/small models under RTX 3080 constraints; analyzed trade-offs in mAP (up to 0.502), latency, and FLOPs.",
            "Identified VRAM overflow in larger models; proposed dynamic batch sizing and learning rate scheduling to stabilize training.",
            "Compared with YOLOv4_sr benchmark, demonstrating YOLOv10's efficiency for edge-device security systems."
          ],
          modal: {
            processTitle: "Process & Analysis details",
            process: "This project involved handling a massive X-ray dataset with severe class imbalance. We focused on optimizing YOLOv10 for deployment in high-stakes security environments with specific hardware constraints. Implemented custom training loops, evaluated data augmentation parameters, and calculated the speed vs accuracy curves across multiple YOLO models.",
            detailsTitle: "More Info",
            details: "Skills used: Python, PyTorch, YOLOv10, Data Engineering, GPU Resource Optimization. The results showed that YOLOv10 small/nano versions are highly viable for deployment in real-time embedded security screening."
          }
        },
        {
          id: "csl-car",
          title: "CSL Ultrasonic Car (Discrete H-Bridge Control)",
          date: "Sep.2025 - Jan.2026",
          links: [
            { text: "💻 GitHub", url: "https://github.com/Annie04082020/CSL_Ultrasonic_Car" }
          ],
          bullets: [
            "Autonomous vehicle capable of object tracking and distance maintenance using ultrasonic feedback.",
            "Custom-designed H-Bridge motor driver built from discrete components (BJTs and Relays) instead of pre-made modules.",
            "Implemented signal processing with a Median Filter to eliminate ultrasonic sensor noise.",
            "Developed Bang-Bang with Deadband control algorithm on Arduino for smooth motor correction and spot turns."
          ],
          modal: {
            processTitle: "Process & Implementation Details",
            process: "Designed and built the chassis, custom electrical layout, and motor driver boards from scratch. Integrated ultrasonic sensors and successfully calibrated the distance feedback using median filtering to ignore false reflections. Structured discrete transistor circuits to avoid integrated H-bridge ICs for deep hardware-level understanding.",
            detailsTitle: "Key Learnings & More Info",
            details: "Gained significant hands-on experience in discrete circuit design, debugging electrical signal noise, and tuning basic controller logic (Bang-Bang with Deadband control) to prevent oscillation."
          }
        },
        {
          id: "behind-brewing",
          title: "Behind Brewing: The Role of Thermistors and Heaters in Coffee Maker",
          date: "Sep.2024 - Jan.2025",
          links: [
            { text: "📄 Poster", url: "https://drive.google.com/file/d/1SSEOqHq4tcBxyClBmXNReTBxNrtyTdih/view" },
            { text: "📄 Report", url: "https://drive.google.com/file/d/1RqWXQ3pm93QrQahQ7eKvH8Fp-MuJWMHF/view" }
          ],
          bullets: [
            "A study and research about practical circuit in real world in Circuit Theory course.",
            "Study of the original circuit and simulation on SIMetrix software.",
            "Modify the parameters to see difference and features of the circuit.",
            "Optimise the circuit in specific usage (Coffee Brewing)."
          ],
          modal: {
            processTitle: "Analysis & Process",
            process: "Deconstructed the electrical architecture of commercial drip coffee makers. Modeled the thermal feedback loops using SPICE software (SIMetrix) and calculated ideal resistor values for precise 92-96°C temperature maintenance.",
            detailsTitle: "Results",
            details: "Provided optimized circuit designs showing a 15% reduction in initial temperature overshoot, ensuring a more consistent extraction."
          }
        },
        {
          id: "linux-odyssey",
          title: "Linux Odyssey: Interactive Terminal Teaching Website",
          date: "Apr.2023 - Now",
          links: [
            { text: "🌐 Website", url: "https://linuxodyssey.xyz/" },
            { text: "💻 GitHub", url: "https://github.com/linux-odyssey/linux-odyssey" },
            { text: "Project Intro", url: "https://youtu.be/XzvfmUf1QP8" }
          ],
          bullets: [
            "Experienced Javascript, TypeScript, Vue Development, Test Automation, Visual Design.",
            "InnoServe Awards 28th Titansoft Agile Second place.",
            "Sch001 2023 Project incubation competition Top prize.",
            "Cooperates with NTPU GDSC in 2024 Autumn."
          ],
          modal: {
            processTitle: "Project Process",
            process: "Co-founded and developed the frontend interactive system utilizing Vue and a custom terminal simulator. Conducted usability tests to iterate on user experience and designed automated tests using Cypress.",
            detailsTitle: "Accomplishments",
            details: "Recognized as a leading open-source education project in Taiwan, winning the g0v Sch001 first prize and the InnoServe Titansoft Agile second place."
          }
        },
        {
          id: "music-block",
          title: "MIT City Science Lab Spring UROP: Music Block",
          date: "Feb.2023 - Jun.2023",
          links: [
            { text: "🎥 Concept Demo Video", url: "https://youtu.be/GiDZrVne1MY" },
            { text: "🎥 Final Demo Video", url: "https://youtu.be/RYG5qpFA1wA" }
          ],
          bullets: [
            "Music Block is a concept product of turning 'Music' into a visible 3D substance, the target is to teach music beginners basic music theory, and also build a sense of sounds through it.",
            "Learn to start a project from 0 to 1, project management, firmware, C.",
            "Firmware Development for the blocks and bottom board."
          ],
          modal: {
            processTitle: "Development Process",
            process: "Worked closely with MIT CSL researchers to define the hardware interface and interaction scheme. Developed firmware in C on microcontrollers to communicate via serial interfaces and coordinate sound synthesis output.",
            detailsTitle: "Key Outcomes",
            details: "Successfully presented the interactive prototype to the lab, proving the pedagogical effectiveness of concrete interfaces for music theory education."
          }
        },
        {
          id: "eco-game",
          title: "Eco-Friendly Board Game",
          date: "Sep.2021 - Jun.2022",
          links: [
            { text: "Game Instruction", url: "https://hackmd.io/@Shomes/SJ1QirDKF" }
          ],
          bullets: [
            "Led and organized the team throughout the project.",
            "Designed the exterior of all the cards and map."
          ],
          modal: {
            processTitle: "Creative Process",
            process: "Drafted gameplay rules focusing on environmental issues (carbon footprint, recycling). Illustrated map artwork, card icons, and layout in vector formats.",
            detailsTitle: "Team Leadership",
            details: "Coordinated cross-discipline roles including game designers, copywriters, and manufacturers, successfully producing a playable physical prototype."
          }
        },
        {
          id: "leda",
          title: "Project work with LEDA Technology",
          date: "May.2021 - Jan.2022",
          links: [],
          bullets: [
            "Experienced AI, Frontend, and Backend Development.",
            "Cooperate with NYCU, and CYCU students. Made a website that people could use AI quickly.",
            "Cooperate with doctors, wrote a program transferring CT files to picture (.jpg, .png) files for data annotation."
          ],
          modal: {
            processTitle: "Implementation Details",
            process: "Contributed to data preparation pipelines for medical imaging. Automated DICOM (CT scan) file extraction and converted slices to PNG formats utilizing Python scripts, speeding up annotations for medical doctors.",
            detailsTitle: "Learnings",
            details: "Gained early insights into healthcare informatics, regulatory file structures, and data handling workflows in industry environments."
          }
        },
        {
          id: "ptech",
          title: "P-TECH Call for Code",
          date: "May.2021 - Jul.2021",
          links: [
            { text: "Concept Video", url: "https://youtu.be/--OcSxoVX7c" },
            { text: "Concept Slides", url: "https://docs.google.com/presentation/d/1kZR2yPctm8VQH8OIeajCIA7lS9Dfmkyc1MmKePWYQAs/edit?usp=sharing" }
          ],
          bullets: [
            "Designed a system due to the pandemic (COVID-19).",
            "The system is divided into two parts: the medical staff part gets requirements to calculate nearest places with adequate materials/manpower.",
            "The normal user part advises on quick sieves and destinations."
          ],
          modal: {
            processTitle: "Design Process",
            process: "Collaborated in a remote team during the peak of COVID-19 pandemic to design a resource routing concept. Formulated allocation rules and mock interfaces for hospital personnel and general public.",
            detailsTitle: "Project Context",
            details: "Designed as a submission for P-TECH Call for Code competition, emphasizing disaster management and emergency resource dispatch."
          }
        },
        {
          id: "python-game",
          title: "Python Project of Game",
          date: "Apr.2021 - Jul.2021",
          links: [
            { text: "Project Slides", url: "https://docs.google.com/presentation/d/1nZF0inf_-JHW2z7FZXvcIbVjg2AGMqM4QNqsCmTZZP0/edit?usp=sharing" }
          ],
          bullets: [
            "Designed a monopoly game with Python."
          ],
          modal: {
            processTitle: "Development Process",
            process: "Coded game state machine, player mechanics, tile property models, and transaction routines in Python using custom console displays.",
            detailsTitle: "Learnings",
            details: "Honed object-oriented programming concepts (OOP), collections data structures, and conditional logic flows."
          }
        }
      ]
    },
    skills: {
      title: "Professional Skills",
      list: [
        {
          category: "Languages",
          items: [
            { name: "Mandarin", detail: "Native", meta: "" },
            { name: "English", detail: "TOEIC RL: 810, SW: 270 | IELTS O: 6.5 | GRE V: 145, Q: 158, AW: 3.5", meta: "" },
            { name: "Japanese", detail: "Passed JLPT N1", meta: "" }
          ]
        },
        {
          category: "Coding Languages",
          items: [
            { name: "Python, C, C++", detail: "", meta: "" },
            { name: "HTML, CSS, JavaScript / TypeScript", detail: "", meta: "" },
            { name: "Vue, Cypress", detail: "", meta: "" }
          ]
        },
        {
          category: "Art & Music Performing",
          items: [
            { name: "Percussion (Solo, Orchestra)", detail: "", meta: "" },
            { name: "Piano (Solo)", detail: "", meta: "" },
            { name: "Trumpet, Baritone (Orchestra)", detail: "", meta: "" },
            { name: "Painting, Designing", detail: "", meta: "" }
          ]
        },
        {
          category: "Sports",
          items: [
            { name: "Taekwondo 1 Dan", detail: "", meta: "December.30.2022" },
            { name: "Taekwondo 2 Dan", detail: "", meta: "March.17.2023" }
          ]
        },
        {
          category: "Certificates & Badges",
          isFullWidth: true,
          items: [
            { name: "MOEA Certified 3D Printing Additive Manufacturing Engineer - Associate Level", detail: "", meta: "July.2023" },
            { name: "Google Cybersecurity", detail: "", meta: "July.2025" },
            { name: "IBM SkillsBuild: Python for Data Science, Growth Behaviors", detail: "", meta: "May.2022, Oct.2023" }
          ]
        }
      ]
    },
    portfolio: {
      title: "Coding Portfolio",
      subtitle: "🌐 Websites & Tools",
      items: [
        { title: "Angry Birds Replica", url: "https://github.com/Annie04082020/Angry_Birds_Replica", desc: " — 1:1 Angry Birds clone in C++ (PTSD engine, SDL2, OOP capstone)" },
        { title: "Review Card Maker", url: "https://annie04082020.github.io/ReviewCardMaker/", desc: " — Flashcard study tool for Pharmaceutical Botany, built with vanilla HTML/CSS/JS" },
        { title: "Linear Algebra Assistant", url: "https://annie04082020.github.io/linear_algebra_assistant/", desc: " — Linear Algebra Application for course verification" },
        { title: "Linux Odyssey", url: "https://linuxodyssey.xyz/", desc: " — Interactive Linux terminal teaching website (Vue)" },
        { title: "This Portfolio Website", url: "https://annie04082020.github.io/", desc: " — You're looking at it right now! (HTML/CSS/JS)" },
        { title: "💻 GitHub: Annie04082020", url: "https://github.com/Annie04082020", desc: " — More code & projects" }
      ]
    },
    experiences: {
      title: "Experiences",
      list: [
        {
          title: "Summer Internship: AUO Corporation",
          company: "AUO",
          date: "July.2022 - Aug.2022",
          bullets: [
            "Experienced AI, Python PyQt GUI Development, YOLOv5, Labelme Application.",
            "Maintaining the AI detection system.",
            "Combine additional regulation tool to retrain model.",
            "Combine additional YOLOv5 detection for different usage and manufacture circumstances."
          ]
        },
        {
          title: "CDL Test Automation Developer: International Business Machines (IBM) Corporation",
          company: "IBM",
          date: "July.2023 - Dec.2023",
          bullets: [
            "Experienced Cypress Test Automation Development, JavaScript.",
            "Fix and write testing files.",
            "Specify website problems from the automation tests."
          ]
        },
        {
          title: "Committee Members: Vice President of Taekwondo Club",
          company: "Taekwondo Club",
          date: "July.2022 - Now",
          bullets: [
            "Raise Club Exposition and School Fair.",
            "Maintain club Operation."
          ]
        },
        {
          title: "Club Performance: Taekwondo Club",
          company: "Taekwondo Club",
          date: "2022 - 2026",
          bullets: [
            "Solo and Group Performances."
          ]
        },
        {
          title: "Tech Community & Talks",
          company: "",
          date: "",
          bullets: [
            "2024 \"Easier Recruitment\" NTUT Sharing Session: Speaker (Linux Odyssey)",
            "2024 COSCUP (Conference for Open Source Coders, Users, and Promoters)",
            "2024 SITCON (Students' Information Technology Conference): Linux Odyssey Workshop",
            "g0v (gov-zero) Hackathons: Project Proposal & Crowdfunding"
          ]
        },
        {
          title: "Engineering Training & Exhibitions",
          company: "",
          date: "",
          bullets: [
            "2025 Taipei Aerospace & Defense Technology Exhibition (TADTE)",
            "2025 National Smart Drone Professional Training Program",
            "2023 Aviation Maintenance Industry Development Training"
          ]
        },
        {
          title: "Competitions",
          company: "",
          date: "",
          bullets: [
            "2024 University IT Innovation & Entrepreneurship Competition: New Startup Track (Second Round)",
            "22nd kW Design Award",
            "2021 GiCS (Girls in CyberSecurity)"
          ]
        },
        {
          title: "Athletic Events",
          company: "",
          date: "",
          bullets: [
            "2026 National Intercollegiate Athletic Games: Taekwondo Poomsae",
            "2025 National Intercollegiate Athletic Games: Taekwondo Sparring",
            "2023 University Football Association (UFA): Men's Division ID"
          ]
        },
        {
          title: "Forums",
          company: "",
          date: "",
          bullets: [
            "2020 New Generation Youth City Forum"
          ]
        }
      ]
    },
    courses: {
      title: "Courses",
      categories: [
        {
          title: "IAE Core Courses",
          items: [
            { domain: "EECS", name: "Artificial Intelligence", date: "Sep.2023 - Jan.2024" },
            { domain: "EECS", name: "Sensors and IoT", date: "Sep.2023 - Jan.2024" },
            { domain: "ME", name: "Robotics and Lab", date: "Feb.2023 - Jun.2023" },
            { domain: "EECS", name: "Machine Vision and Lab", date: "Feb.2023 - Jun.2023" },
            { domain: "ME", name: "Machine Design", date: "Feb.2023 - Jun.2023" },
            { domain: "EECS", name: "Communications and Networks", date: "Sep.2022 - Jan.2023" },
            { domain: "Systems", name: "Intelligent Control", date: "Sep.2022 - Jan.2023" },
            { domain: "ME", name: "Mechanical Engineering Laboratory I", date: "Sep.2022 - Jan.2023" },
            { domain: "ME", name: "Kinematics of Machinery", date: "Sep.2022 - Jan.2023" },
            { domain: "Systems", name: "Mechatronics and Lab", date: "Feb.2022 - Jun.2022" },
            { domain: "ME", name: "Mechanics of Materials", date: "Feb.2022 - Jun.2022" },
            { domain: "ME", name: "Dynamics", date: "Sep.2021 - Jan.2022" },
            { domain: "EECS", name: "Deep Learning TensorFlow", date: "Sep.2021 - Jan.2022" },
            { domain: "ME", name: "Programmable Logic Controllers and Lab", date: "Feb.2021 - Jun.2021" },
            { domain: "ME", name: "Statics", date: "Feb.2021 - Jun.2021" },
            { domain: "ME", name: "Manufacturing Processes", date: "Feb.2021 - Jun.2021" },
            { domain: "ME", name: "Engineering Materials", date: "Feb.2021 - Jun.2021" },
            { domain: "ME", name: "CNC Machine Tools and Lab", date: "Sep.2020 - Jan.2021" },
            { domain: "ME", name: "Pneumatics and Hydraulics", date: "Sep.2020 - Jan.2021" },
            { domain: "EECS", name: "Introduction to Artificial Intelligence", date: "Feb.2020 - June.2020" },
            { domain: "ME", name: "Mechanical Basic Practice I, II", date: "Sep.2019 - Jan.2020, Feb.2020 - Jun.2020" },
            { domain: "EECS", name: "Introduction to Computer Science", date: "Sep.2019 - Jan.2020" },
            { domain: "ME", name: "Engineering Graphics", date: "Sep.2019 - Jan.2020" },
            { domain: "ME", name: "Computer-Aided Drafting", date: "Sep.2019 - Jan.2020" },
            { domain: "Systems", name: "Introduction to Artificial Intelligence", date: "Feb.2020 - June.2020" }
          ]
        },
        {
          title: "EE Core Courses",
          items: [
            { dept: "CSIE", name: "Object-Oriented Programming Lab", date: "Feb.2026 - Jun.2026" },
            { dept: "ECE", name: "Advanced FPGA Design", date: "Feb.2026 - Jun.2026" },
            { dept: "EE", name: "Linear Algebra", date: "Feb.2026 - Jun.2026" },
            { dept: "EE", name: "Digital Logic Design Lab", date: "Feb.2026 - Jun.2026" },
            { dept: "EE", name: "Communication Systems Lab", date: "Feb.2026 - Jun.2026" },
            { dept: "EE", name: "Satellite Remote Sensing Applications and Lab", date: "Sep.2025 - Jan.2026" },
            { dept: "EE", name: "Control Systems Lab", date: "Sep.2025 - Jan.2026" },
            { dept: "CSIE", name: "Object-Oriented Programming", date: "Sep.2025 - Jan.2026" },
            { dept: "EE", name: "Power Electronics", date: "Sep.2025 - Jan.2026" },
            { dept: "EE", name: "Power Electronics Lab", date: "Feb.2025 - Jun.2025" },
            { dept: "EE", name: "Microprocessors", date: "Feb.2025 - Jun.2025" },
            { dept: "EE", name: "Electric Circuits II", date: "Feb.2025 - Jun.2025" },
            { dept: "EE", name: "Electronics II", date: "Feb.2025 - Jun.2025" },
            { dept: "EE", name: "Digital Systems", date: "Sep.2024 - Jan.2025" },
            { dept: "EECS Class", name: "Electronics Laboratory I, II", date: "Sep.2024 - Jan.2025, Feb.2025 - Jun.2025" },
            { dept: "EE", name: "Signals and Systems", date: "Sep.2024 - Jan.2025" },
            { dept: "ECE", name: "Electric Circuits I", date: "Sep.2024 - Jan.2025" },
            { dept: "CSIE", name: "Discrete Mathematics", date: "Feb.2024 - Jun.2024" },
            { dept: "CSIE", name: "Data Structures", date: "Sep.2023 - Jan.2024" },
            { dept: "IAE", name: "Probability and Statistics", date: "Feb.2023 - Jun.2023" },
            { dept: "IAE", name: "Microprocessors and Lab", date: "Feb.2022 - Jun.2022" },
            { dept: "IAE", name: "Automatic Control and Lab", date: "Feb.2022 - Jun.2022" },
            { dept: "IAE", name: "Electrical Machinery", date: "Feb.2022 - Jun.2022" },
            { dept: "IAE", name: "Digital Logic and Lab", date: "Sep.2021 - Jan.2022" },
            { dept: "IAE", name: "Electronics and Lab", date: "Sep.2021 - Jan.2022" },
            { dept: "IAE", name: "Computer Programming and Lab", date: "Sep.2020 - Jan.2021, Feb.2021 - Jun.2021" }
          ]
        },
        {
          title: "Interdisciplinary & Electives",
          items: [
            { dept: "CSIE", name: "Object-Oriented Programming Lab", date: "Feb.2026 - Jun.2026" },
            { dept: "ECE", name: "Advanced FPGA Design", date: "Feb.2026 - Jun.2026" },
            { dept: "TMU Pharmacy", name: "Pharmaceutical Botany", link: { text: "Review Card Maker", url: "https://annie04082020.github.io/ReviewCardMaker/" }, date: "Sep.2025 - Jan.2026" },
            { dept: "Education", name: "Principles & Practices of Guidance", date: "Sep.2025 - Jan.2026" },
            { dept: "Education", name: "Learning Assessment", date: "Feb.2025 - Jun.2025" },
            { dept: "Education", name: "Educational Psychology", date: "Sep.2024 - Jan.2025" },
            { dept: "Arch", name: "Structural Systems in Architecture", date: "Sep.2023 - Jan.2024" },
            { dept: "Arch", name: "Architectural Programming", date: "Sep.2023 - Jan.2024" },
            { dept: "IAE", name: "3D Printing and Lab", date: "Sep.2023 - Jan.2024" },
            { dept: "IAE", name: "Network Programming", date: "Sep.2022 - Jan.2023" },
            { dept: "IEM", name: "Cloud Application Development & Practice", date: "Sep.2022 - Jan.2023" },
            { dept: "IAE", name: "Circuit Design and Lab", date: "Feb.2022 - Jun.2022" },
            { dept: "IAE", name: "Industry 4.0 Lectures", date: "Feb.2022 - Jun.2022" },
            { dept: "ID", name: "Computer-Aided Visual Design", link: { text: "Course Portfolio", url: "https://drive.google.com/file/d/1KgDQrJPf-aZk-drospd4g466EOqj9kUw/view" }, date: "Sep.2021 - Jan.2022" },
            { dept: "IAE", name: "Introduction to Patent Law", date: "Feb.2021 - Jun.2021" },
            { dept: "Club", name: "Share@AI Coding Club in NTUT", date: "Jan.2021 - May.2021" },
            { dept: "IAE", name: "Matlab/Simulink Programming", date: "Sep.2020 - Jan.2021" },
            { dept: "IAE", name: "German I, II", date: "Sep.2019 - Jan.2020, Feb.2024 - Jun.2024" },
            { dept: "IAE", name: "Japanese I, II, III", date: "Sep.2019 - Jan.2020, Feb.2020 - Jun.2020, Sep.2020 - Jan.2021" }
          ]
        }
      ]
    },
    awards: {
      title: "Awards & Activities",
      list: [
        { title: "Sch001 2023 Project Incubation Competition", date: "March.2.2024", detail: " - First Prize" },
        { title: "InnoServe Awards 28th", date: "Nov.7.2023", detail: " - Titansoft Agile Second place" },
        { title: "NanYing National Taekwondo Championship", date: "Apr.2.2022", detail: " - Group College and High School Girls First and Second Level, Third place" },
        { title: "City Youth Forum", date: "Dec.25-26.2020", detail: " - Final Prize in School Monographic Group" }
      ]
    },
    footer: {
      text: "© 2025 Annie Huang | Built with GitHub Pages"
    }
  },
  zh: {
    title: "黃安華 (Annie) | 網頁履歷",
    logoName: "黃安華 (Annie)",
    nav: {
      about: "關於我",
      projects: "專案",
      skills: "技能",
      experiences: "經歷",
      courses: "修課記錄",
      awards: "獎項與活動",
      journal: "📝 個人日誌"
    },
    hero: {
      name: "黃安華 (Annie)",
      subtitles: [
        "電機 | 機械 | 程式設計",
        "視覺設計 | 音樂 | 語言學習 | 跆拳道"
      ],
      aboutTitle: "關於我",
      aboutText: "我是一個充滿好奇心的創作者，喜歡嘗試不同領域的活動與專案。透過語言、繪畫、寫作、程式設計，我能將想法化為作品，勇於挑戰陌生領域並拓展視野。"
    },
    upcoming: {
      title: "未來計畫",
      items: [
        { name: "日本-北九州 NSW 暑期實習", date: "2026.07 - 2026.08" },
        { name: "研究所(待定)", date: "" }
      ]
    },
    education: {
      title: "教育",
      items: [
        {
          degree: "電機工程系 學士",
          school: "國立台北科技大學",
          date: "Sep.2024 - Jun.2026",
          note: ""
        },
        {
          degree: "智慧自動化工程科 副學士",
          school: "國立台北科技大學",
          date: "Sep.2019 - Jun.2024",
          note: "🎓 每學期皆獲學業表現獎學金"
        }
      ],
      accordionTitle: "早期資優教育與全人發展",
      accordionSections: [
        {
          title: "資優鑑定與養成",
          date: "2012-2019",
          paragraphs: [
            "多維度系統性思維：培養了透過多重視角分析複雜工程挑戰的習慣——整合機械結構、電機控制與資訊科學。這使我能夠識別出他人可能會忽略的「系統性不一致」與潛在的低效問題。",
            "自主學習與資源整合：秉持「世界就是我的教室」的理念。不被動等待正式指導，我習慣於自主研究並整合多樣化資源，以掌握未知技術，例如 YOLOv10 和 FPGA。",
            "策略執行與韌性：具備界定複雜問題並在實際限制下保持進度的經驗。在面對充滿挑戰的想法時，我培養了反覆驗證的韌性，以及在高壓環境中排定任務優先順序的務實判斷力。"
          ]
        },
        {
          title: "音樂班與管弦樂團",
          date: "2012-2016(main)",
          paragraphs: [
            "主修打擊樂與副修鋼琴：多年來對各類樂器（包含鍵盤打擊與節奏打擊）的嚴格訓練，培養了高度的手眼協調能力，以及精確掌握複雜任務所需的自我紀律。",
            "樂理與聽寫技能：有系統地學習樂理與聽寫訓練，鍛鍊了我的模式識別能力及對抽象結構的邏輯分析能力。",
            "管弦樂隊與合奏經驗：參與管樂團與弦樂團的經驗強調了「團隊協作」的精確性。身為打擊樂手，我負責維持團隊的節拍與穩定性，這項技能可直接轉化為協調實驗室多位使用者及維持系統同步的能力。"
          ]
        }
      ]
    },
    projects: {
      title: "專案",
      list: [
        {
          id: "angry-birds",
          title: "Angry Birds 完整復刻版（C++ / PTSD 引擎）",
          date: "Feb.2026 - Jun.2026",
          links: [
            { text: "💻 GitHub", url: "https://github.com/Annie04082020/Angry_Birds_Replica" },
            { text: "🎥 期中成果", url: "https://youtu.be/V9pe8lg6LLU" },
            { text: "🎥 期末成果", url: "https://youtu.be/aVP6Vbt74fo" }
          ],
          bullets: [
            "物件導向程式設計實習（OOPL 2026春）課程成果，以 C++ 1:1 完整復刻 Angry Birds。",
            "具備物理彈弓發射機制、多種鳥類特殊技能，以及以木頭、石頭、冰塊搭建的豬隻防禦堡壘。",
            "基於 PTSD 遊戲框架開發，涵蓋渲染、音效（SDL2_mixer + OGG/Vorbis）及碰撞偵測。",
            "應用 OOP 設計原則：鳥類/豬/方塊的繼承階層、多型技能觸發、元件化場景管理。"
          ],
          modal: {
            processTitle: "開發過程",
            process: "以專案經理（PM）身分與組員兩人合作完成一學期的開發。從彈弓拋體物理、多階段方塊破壞到鳥類技能觸發，完整設計遊戲架構。整合 PTSD（北科開源社 C++ 2D 遊戲框架）並擴充實作了關卡載入、分數計算及動態粒子特效等系統。",
            detailsTitle: "技術亮點",
            bullets: [
              "<strong>物理系統</strong>：拋體運動模擬（含空氣阻力）；圓形與矩形剛體碰撞響應。",
              "<strong>鳥類技能</strong>：紅色（標準）、黃色（加速衝刺）、藍色（三連分裂）、黑色（爆炸）、白色（下蛋）。",
              "<strong>方塊材質</strong>：木頭 / 石頭 / 冰塊 — 各具不同 HP、質量與破碎動畫。",
              "<strong>音效</strong>：SDL2_mixer + OGG/Vorbis，涵蓋發射音效、碰撞音效及背景音樂。",
              "<strong>工具</strong>：C++17、CMake、SDL2、PTSD 框架；開發環境為 WSL Ubuntu + Windows。"
            ]
          }
        },
        {
          id: "csl-car",
          title: "CSL Ultrasonic Car (Discrete H-Bridge Control)",
          date: "Sep.2025 - Jan.2026",
          links: [
            { text: "💻 GitHub", url: "https://github.com/Annie04082020/CSL_Ultrasonic_Car" }
          ],
          bullets: [
            "配備超音波感測器之自律行駛避障小車，具備障礙物跟隨與距離保持功能。",
            "採用離散元件（BJT 與繼電器）手工搭建 H 橋馬達驅動器，捨棄現成驅動模組。",
            "實作中值濾波器（Median Filter）排除超音波感測雜訊。",
            "開發具備死區控制（Deadband）的 Bang-Bang 控制演算法，實現平滑修正與現地轉向。"
          ],
          modal: {
            processTitle: "實作過程與細節",
            process: "從零開始設計並製作車體底盤、客製化電路佈局以及馬達驅動板。整合超音波感測器並透過中值濾波進行精準測距校正，濾除錯誤反射訊號。手工搭建離散電晶體 H 橋，捨棄現成驅動 IC 以求深度理解硬體底層運作原理。",
            detailsTitle: "更多資訊",
            details: "在此專案中獲得了豐富的離散電路設計與除錯經驗，並學會如何優化電路雜訊及調校控制器邏輯（Bang-Bang control），避免馬達產生過度震盪。"
          }
        },
        {
          id: "yolo-v10",
          title: "基於 YOLO 模型的 SIXray 數據集違禁物識別性能分析：以 YOLOv10 為例",
          date: "2025年12月 – 2026年3月 (畢業專題)",
          links: [
            { text: "📄 專案報告 PDF", url: "https://your-link-to-pdf.com/SIXrayYOLO_Report.pdf" }
          ],
          bullets: [
            "處理 SIXray 數據集（100萬+ X光影像）極端不平衡問題；實作類別平衡分組與 Mosaic 數據增強。",
            "在 RTX 3080 限制下訓練 YOLOv10 nano/small 模型；分析 mAP、延遲與 FLOPs 權衡。",
            "解決較大模型的 VRAM 溢出問題；提出動態批次大小與學習率排程優化訓練。",
            "與 YOLOv4_sr 比較，證明 YOLOv10 在邊緣運算安全監控系統中的高效性。"
          ],
          modal: {
            processTitle: "實作過程",
            process: "此專案涉及處理具有嚴重類別不平衡的大規模 X 光數據集。我們專注於在特定的硬體限制下，優化 YOLOv10 以部署於高風險的安全環境。實作了客製化的訓練迴圈、評估了資料增強參數，並計算了多個 YOLO 模型的速度與準確度權衡曲線。",
            detailsTitle: "更多資訊",
            details: "相關技能: Python, PyTorch, YOLOv10 (物件偵測), 數據工程, GPU 資源優化。實驗證明，YOLOv10 nano/small 版本非常適合部署於需要即時影像辨識的嵌入式安全篩檢設備。"
          }
        },
        {
          id: "linux-odyssey",
          title: "Linux Odyssey: 互動式教學網站",
          date: "Apr.2023 - Now",
          links: [
            { text: "🌐 網站", url: "https://linuxodyssey.xyz/" },
            { text: "💻 GitHub", url: "https://github.com/linux-odyssey/linux-odyssey" },
            { text: "專案介紹", url: "https://youtu.be/XzvfmUf1QP8" }
          ],
          bullets: [
            "以 Vue 開發的互動式教學網站，推廣開源教育。",
            "第 28 屆 大專校院資訊應用服務創新競賽 鈦坦敏捷開發獎 第二名。",
            "第 4 屆 g0v 零時小學校專案孵化競賽 首獎。",
            "負責前端開發、自動化測試與視覺設計。"
          ],
          modal: {
            processTitle: "實作過程與細節",
            process: "共同發起並開發基於 Vue 框架的互動式終端機模擬教學系統。進行多次可用性測試以迭代使用者體驗，並使用 Cypress 撰寫前端自動化測試測試案例。",
            detailsTitle: "更多資訊",
            details: "此專案被評選為台灣優秀的開源教育專案，獲 g0v 零時小學校孵化競賽首獎及資訊創新競賽鈦坦敏捷開發獎第二名。"
          }
        },
        {
          id: "music-block",
          title: "MIT City Science Lab: Music Block",
          date: "Feb.2023 - Jun.2023",
          links: [
            { text: "🎥 Concept Demo Video", url: "https://youtu.be/GiDZrVne1MY" },
            { text: "🎥 Final Demo Video", url: "https://youtu.be/RYG5qpFA1wA" }
          ],
          bullets: [
            "將「音樂」實體化的互動裝置，幫助初學者理解樂理，同時具備創意工具潛力。負責專案的韌體與 C 語言開發。",
            "學習從 0 到 1 啟動專案、專案管理、韌體開發與 C 語言。"
          ],
          modal: {
            processTitle: "實作過程與細節",
            process: "與 MIT 媒體實驗室的 City Science 團隊緊密合作，定義硬體通訊協議及互動介面。在微控制器上利用 C 語言編寫韌體，實現各積木板與主板間的序列通訊及即時聲音合成輸出控制。",
            detailsTitle: "更多資訊",
            details: "成功向實驗室展示了可運行的實體互動原型，證實了具體化介面在樂理教學輔助上的潛力與成效。"
          }
        },
        {
          id: "behind-brewing",
          title: "Behind Brewing: Coffee Maker Circuit Study",
          date: "Sep.2024 - Jan.2025",
          links: [
            { text: "📄 Poster", url: "https://drive.google.com/file/d/1SSEOqHq4tcBxyClBmXNReTBxNrtyTdih/view" },
            { text: "📄 Report", url: "https://drive.google.com/file/d/1RqWXQ3pm93QrQahQ7eKvH8Fp-MuJWMHF/view" }
          ],
          bullets: [
            "分析與模擬咖啡機電路，探索電路參數如何影響加熱與溫控。",
            "運用 SIMetrix 軟體進行模擬並最佳化沖泡咖啡的電路應用。"
          ],
          modal: {
            processTitle: "實作過程與細節",
            process: "拆解並分析市售美式滴濾咖啡機的電路架構。使用電路模擬軟體 (SIMetrix SPICE) 建立熱回饋迴路模型，並重新計算熱敏電阻及加熱器阻值，以達成精準的 92-96°C 恆溫控制。",
            detailsTitle: "更多資訊",
            details: "優化後的電路設計成功減少了 15% 的初始溫度過衝，讓咖啡萃取過程的熱穩定性大幅提升。"
          }
        },
        {
          id: "leda",
          title: "AI/醫療數據處理 (CT 轉檔程式) (與 LEDA Technology 合作)",
          date: "May.2021 - Jan.2022",
          links: [],
          bullets: [
            "參與 AI、前端與後端開發。",
            "與交大、中原學生合作開發快速套用 AI 模型的展示網站。",
            "與醫生合作，撰寫將 DICOM (CT 斷層掃描) 影像批次轉為 JPG/PNG 格式的 Python 程式以利標記資料。"
          ],
          modal: {
            processTitle: "實作過程與細節",
            process: "協助建置醫療影像標記的前置處理流程，利用 Python 腳本將醫療等級的 DICOM 格式斷層切片批次轉換成常見的圖像檔，降低標記工具的使用門檻。",
            detailsTitle: "更多資訊",
            details: "此合作奠定了對醫療資訊學、隱私法規限制以及產學合作數據處理流程的基礎認識。"
          }
        },
        {
          id: "ptech",
          title: "P-TECH Call for Code 疫情人力調度系統",
          date: "May.2021 - Jul.2021",
          links: [
            { text: "Concept Video", url: "https://youtu.be/--OcSxoVX7c" },
            { text: "Concept Slides", url: "https://docs.google.com/presentation/d/1kZR2yPctm8VQH8OIeajCIA7lS9Dfmkyc1MmKePWYQAs/edit?usp=sharing" }
          ],
          bullets: [
            "針對 COVID-19 疫情設計的物資與人力調度概念系統。",
            "醫療端系統：接收各院所物資/人力需求，並計算最近的適當支援據點。",
            "大眾端系統：提供快速篩檢點引導與目的地分流指引。"
          ],
          modal: {
            processTitle: "實作過程與細節",
            process: "在疫情警戒期間，與跨地組員進行全遠端協作。設計出一套能根據醫院庫存與病床量進行動態資源分配的算法原型，並繪製對應之網頁 Mockup 介面。",
            detailsTitle: "更多資訊",
            details: "專案以防災與緊急應變資源調度為核心，投件參賽 P-TECH Call for Code 競賽。"
          }
        },
        {
          id: "eco-game",
          title: "Eco-Friendly Board Game 設計與團隊領導",
          date: "Sep.2021 - Jun.2022",
          links: [
            { text: "Game Instruction", url: "https://hackmd.io/@Shomes/SJ1QirDKF" }
          ],
          bullets: [
            "領導並規劃團隊的開發時程與分工。",
            "獨立設計所有遊戲卡牌與地圖插畫的視覺風格。"
          ],
          modal: {
            processTitle: "實作過程與細節",
            process: "以碳足跡和資源回收為主題，擬定桌遊的遊玩規則與數值機制。使用向量圖形工具繪製地圖場景、功能卡牌插畫與排版設計。",
            detailsTitle: "更多資訊",
            details: "帶領來自不同背景的成員（包含企劃與印刷協力），最終成功產出可實際遊玩運作的實體桌遊樣品。"
          }
        },
        {
          id: "python-game",
          title: "Python 大富翁遊戲設計",
          date: "Apr.2021 - Jul.2021",
          links: [
            { text: "Project Slides", url: "https://docs.google.com/presentation/d/1nZF0inf_-JHW2z7FZXvcIbVjg2AGMqM4QNqsCmTZZP0/edit?usp=sharing" }
          ],
          bullets: [
            "使用 Python 實作經典大富翁桌遊的邏輯與遊戲狀態。"
          ],
          modal: {
            processTitle: "實作過程與細節",
            process: "編寫遊戲的主狀態機、玩家行動機制、地產買賣與過路費計算邏輯，並以自訂的主控台文字介面進行渲染與操作。",
            detailsTitle: "更多資訊",
            details: "本專案磨練了物件導向設計 (OOP)、資料結構（如 Lists 與 Dicts）以及複雜邏輯的條件控制流程。"
          }
        }
      ]
    },
    skills: {
      title: "專業技能",
      list: [
        {
          category: "語言",
          items: [
            { name: "中文", detail: "母語", meta: "" },
            { name: "英文", detail: "TOEIC RL: 810, SW: 270 | IELTS O: 6.5 | GRE V: 145, Q: 158, AW: 3.5", meta: "" },
            { name: "日文", detail: "JLPT N1 合格", meta: "" }
          ]
        },
        {
          category: "程式語言",
          items: [
            { name: "Python, C, C++", detail: "", meta: "" },
            { name: "HTML, CSS, JavaScript / TypeScript", detail: "", meta: "" },
            { name: "Vue, Cypress", detail: "", meta: "" }
          ]
        },
        {
          category: "設計與表演",
          items: [
            { name: "打擊樂（獨奏、樂團）", detail: "", meta: "" },
            { name: "鋼琴（獨奏）", detail: "", meta: "" },
            { name: "小號、上低音號（樂團）", detail: "", meta: "" },
            { name: "繪畫、平面設計", detail: "", meta: "" }
          ]
        },
        {
          category: "體育",
          items: [
            { name: "跆拳道一段", detail: "", meta: "December.30.2022" },
            { name: "跆拳道二段", detail: "", meta: "March.17.2023" }
          ]
        },
        {
          category: "證照與徽章",
          isFullWidth: true,
          items: [
            { name: "經濟部 3D 列印積層製造工程師能力鑑定 (iPAS)-初級", detail: "", meta: "July.2023" },
            { name: "Google Cybersecurity", detail: "", meta: "July.2025" },
            { name: "IBM SkillsBuild: Python for Data Science, Growth Behaviors", detail: "", meta: "May.2022, Oct.2023" }
          ]
        }
      ]
    },
    portfolio: {
      title: "Coding 作品集",
      subtitle: "🌐 網站與工具",
      items: [
        { title: "Angry Birds Replica", url: "https://github.com/Annie04082020/Angry_Birds_Replica", desc: " — C++ 1:1 Angry Birds 復刻（PTSD 引擎、SDL2、OOP 課程成果）" },
        { title: "圖卡複習工具 (Review Card Maker)", url: "https://annie04082020.github.io/ReviewCardMaker/", desc: " — 藥用植物學複習用途，純 HTML/CSS/JS" },
        { title: "線性代數助手 (Linear Algebra Assistant)", url: "https://annie04082020.github.io/linear_algebra_assistant/", desc: " — 線性代數計算工具，課程輔助用" },
        { title: "Linux Odyssey", url: "https://linuxodyssey.xyz/", desc: " — 互動式 Linux 教學網站 (Vue)" },
        { title: "個人履歷網站", url: "https://annie04082020.github.io/", desc: " — 你現在正在看的這個！(HTML/CSS/JS)" },
        { title: "💻 GitHub: Annie04082020", url: "https://github.com/Annie04082020", desc: " — 其他程式碼與專案" }
      ]
    },
    experiences: {
      title: "經歷",
      list: [
        {
          title: "暑期實習生: 友達股份有限公司",
          company: "友達光電",
          date: "July.2022 - Aug.2022",
          bullets: [
            "經歷 AI、Python PyQt GUI 開發、YOLOv5、Labelme 應用程式操作。",
            "維護與調整 AI 偵測系統。",
            "結合其他規則工具重新訓練模型以適應不同操作情境。",
            "結合其他 YOLOv5 偵測應用以適應廠區製造情境。"
          ]
        },
        {
          title: "CDL Test Automation Developer: 國際商業機器股份有限公司 (IBM)",
          company: "IBM",
          date: "July.2023 - Dec.2023",
          bullets: [
            "經歷 Cypress 自動化測試開發、JavaScript。",
            "修復與撰寫測試檔案程式碼。",
            "透過自動化測試找出網站與專案潛在問題。"
          ]
        },
        {
          title: "社團幹部：跆拳道社副社長",
          company: "跆拳道社",
          date: "July.2022 - Aug.2023",
          bullets: [
            "籌辦社團聯展與校慶活動。",
            "維持社團營運與招生工作。"
          ]
        },
        {
          title: "社團公演：跆拳道社",
          company: "跆拳道社",
          date: "2022 - 2026",
          bullets: [
            "個人與團體演出。"
          ]
        },
        {
          title: "技術社群與專案發表",
          company: "",
          date: "",
          bullets: [
            "2024 拉人更輕鬆：北科分享會講者 (Linux Odyssey)",
            "2024 COSCUP (開源人年會)",
            "2024 SITCON Linux Odyssey 工作坊",
            "g0v 零時政府：專案提案與募資"
          ]
        },
        {
          title: "工程專業培訓與展覽",
          company: "",
          date: "",
          bullets: [
            "2025 台北國際航太暨國防工業展覽會 (TADTE)",
            "2025 國家智慧無人機專業人才培訓課程",
            "2023 航空修護產業現況與發展研習課程"
          ]
        },
        {
          title: "競賽參與",
          company: "",
          date: "",
          bullets: [
            "2024 大專校院資訊應用服務創新競賽：創業新秀選拔 (晉級複賽)",
            "第 22 屆 瓩設計獎 (kW Design Award)",
            "2021 GiCS 資安女婕思"
          ]
        },
        {
          title: "體育賽事",
          company: "",
          date: "",
          bullets: [
            "2026 全國大專校院運動會：跆拳道一般組品勢",
            "2025 全國大專校院運動會：跆拳道一般組對打",
            "2023 全國大專校院足球聯賽：男生組第二級"
          ]
        },
        {
          title: "論壇參與",
          company: "",
          date: "",
          bullets: [
            "2020 新世代青年城市論壇"
          ]
        }
      ]
    },
    courses: {
      title: "修課記錄",
      categories: [
        {
          title: "智動科核心課程",
          items: [
            { domain: "電資", name: "人工智慧", date: "Sep.2023 - Jan.2024" },
            { domain: "電資", name: "感測器與物聯網", date: "Sep.2023 - Jan.2024" },
            { domain: "機械", name: "機器人學與實習", date: "Feb.2023 - Jun.2023" },
            { domain: "電資", name: "機器視覺與實習", date: "Feb.2023 - Jun.2023" },
            { domain: "機械", name: "機械設計", date: "Feb.2023 - Jun.2023" },
            { domain: "電資", name: "通訊與網路", date: "Sep.2022 - Jan.2023" },
            { domain: "系統", name: "智慧型控制", date: "Sep.2022 - Jan.2023" },
            { domain: "機械", name: "機械工程實驗 I", date: "Sep.2022 - Jan.2023" },
            { domain: "機械", name: "機動學", date: "Sep.2022 - Jan.2023" },
            { domain: "系統", name: "機電整合與實習", date: "Feb.2022 - Jun.2022" },
            { domain: "機械", name: "材料力學", date: "Feb.2022 - Jun.2022" },
            { domain: "機械", name: "動力學", date: "Sep.2021 - Jan.2022" },
            { domain: "電資", name: "深度學習 TensorFlow", date: "Sep.2021 - Jan.2022" },
            { domain: "機械", name: "可程式控制與實習", date: "Feb.2021 - Jun.2021" },
            { domain: "機械", name: "靜力學", date: "Feb.2021 - Jun.2021" },
            { domain: "機械", name: "製造學", date: "Feb.2021 - Jun.2021" },
            { domain: "機械", name: "工程材料", date: "Feb.2021 - Jun.2021" },
            { domain: "機械", name: "數控工具機與實習", date: "Sep.2020 - Jan.2021" },
            { domain: "機械", name: "氣液壓學及實習", date: "Sep.2020 - Jan.2021" },
            { domain: "電資", name: "人工智慧概論", date: "Feb.2020 - June.2020" },
            { domain: "機械", name: "機械基礎實習 I, II", date: "Sep.2019 - Jan.2020, Feb.2020 - Jun.2020" },
            { domain: "電資", name: "計算機概論", date: "Sep.2019 - Jan.2020" },
            { domain: "機械", name: "工程圖學", date: "Sep.2019 - Jan.2020" },
            { domain: "機械", name: "電腦輔助製圖", date: "Sep.2019 - Jan.2020" },
            { domain: "系統", name: "智慧自動化概論", date: "Sep.2019 - Jan.2020" }
          ]
        },
        {
          title: "電機核心課程",
          items: [
            { dept: "資工系", name: "物件導向程式設計實習", date: "Feb.2026 - Jun.2026" },
            { dept: "電子系", name: "進階FPGA設計", date: "Feb.2026 - Jun.2026" },
            { dept: "電機系", name: "線性代數", date: "Feb.2026 - Jun.2026" },
            { dept: "電機系", name: "數位邏輯設計實習", date: "Feb.2026 - Jun.2026" },
            { dept: "電機系", name: "通訊系統實習", date: "Feb.2026 - Jun.2026" },
            { dept: "電機系", name: "衛星遙測應用與實習", date: "Sep.2025 - Jan.2026" },
            { dept: "電機系", name: "控制系統實習", date: "Sep.2025 - Jan.2026" },
            { dept: "資工系", name: "物件導向程式設計", date: "Sep.2025 - Jan.2026" },
            { dept: "電機系", name: "電力電子學", date: "Sep.2025 - Jan.2026" },
            { dept: "電機系", name: "電力電子學實習", date: "Feb.2025 - Jun.2025" },
            { dept: "電機系", name: "微處理機", date: "Feb.2025 - Jun.2025" },
            { dept: "電機系", name: "電路學 II", date: "Feb.2025 - Jun.2025" },
            { dept: "電機系", name: "電子學 II", date: "Feb.2025 - Jun.2025" },
            { dept: "電機系", name: "數位系統", date: "Sep.2024 - Jan.2025" },
            { dept: "電資學士班", name: "電子學實習 I, II", date: "Sep.2024 - Jan.2025, Feb.2025 - Jun.2025" },
            { dept: "電機系", name: "訊號與系統", date: "Sep.2024 - Jan.2025" },
            { dept: "電子系", name: "電路學 I", date: "Sep.2024 - Jan.2025" },
            { dept: "資工系", name: "離散數學", date: "Feb.2024 - Jun.2024" },
            { dept: "資工系", name: "資料結構", date: "Sep.2023 - Jan.2024" },
            { dept: "智動科", name: "機率與統計", date: "Feb.2023 - Jun.2023" },
            { dept: "智動科", name: "微處理機與實習", date: "Feb.2022 - Jun.2022" },
            { dept: "智動科", name: "自動控制及實習", date: "Feb.2022 - Jun.2022" },
            { dept: "智動科", name: "電機機械", date: "Feb.2022 - Jun.2022" },
            { dept: "智動科", name: "數位邏輯與實習", date: "Sep.2021 - Jan.2022" },
            { dept: "智動科", name: "電子學與實習", date: "Sep.2021 - Jan.2022" },
            { dept: "智動科", name: "程式設計與實習", date: "Sep.2020 - Jan.2021, Feb.2021 - Jun.2021" }
          ]
        },
        {
          title: "跨領域與選修課程",
          items: [
            { dept: "資工系", name: "物件導向程式設計實習", date: "Feb.2026 - Jun.2026" },
            { dept: "電子系", name: "進階 FPGA 設計", date: "Feb.2026 - Jun.2026" },
            { dept: "北醫藥學系", name: "藥用植物學", link: { text: "圖卡複習工具", url: "https://annie04082020.github.io/ReviewCardMaker/" }, date: "Sep.2025 - Jan.2026" },
            { dept: "教育學程", name: "輔導原理與實務", date: "Sep.2025 - Jan.2026" },
            { dept: "教育學程", name: "學習評量", date: "Feb.2025 - Jun.2025" },
            { dept: "教育學程", name: "教育心理學", date: "Sep.2024 - Jan.2025" },
            { dept: "建築系", name: "建築結構系統", date: "Sep.2023 - Jan.2024" },
            { dept: "建築系", name: "建築計畫學", date: "Sep.2023 - Jan.2024" },
            { dept: "智動科", name: "3D 列印與實習", date: "Sep.2023 - Jan.2024" },
            { dept: "智動科", name: "網路程式設計", date: "Sep.2022 - Jan.2023" },
            { dept: "工管系", name: "雲端應用程式開發與應用", date: "Sep.2022 - Jan.2023" },
            { dept: "智動科", name: "電路設計與實習", date: "Feb.2022 - Jun.2022" },
            { dept: "智動科", name: "工業 4.0 講座", date: "Feb.2022 - Jun.2022" },
            { dept: "工設系", name: "電腦輔助視覺設計", link: { text: "課程作品集", url: "https://drive.google.com/file/d/1KgDQrJPf-aZk-drospd4g466EOqj9kUw/view" }, date: "Sep.2021 - Jan.2022" },
            { dept: "智動科", name: "專利法概述", date: "Feb.2021 - Jun.2021" },
            { dept: "社團", name: "Share@AI Coding Club in NTUT", date: "Jan.2021 - May.2021" },
            { dept: "智動科", name: "Matlab/Simulink 程式設計", date: "Sep.2020 - Jan.2021" },
            { dept: "智動科", name: "德文 I, II", date: "Sep.2019 - Jan.2020, Feb.2024 - Jun.2024" },
            { dept: "智動科", name: "日文 I, II, III", date: "Sep.2019 - Jan.2020, Feb.2020 - Jun.2020, Sep.2020 - Jan.2021" }
          ]
        }
      ]
    },
    awards: {
      title: "獎項與活動",
      list: [
        { title: "Sch001 2023 Project Incubation Competition", date: "March.2.2024", detail: " - 首獎" },
        { title: "InnoServe Awards 28th", date: "Nov.7.2023", detail: " - Titansoft Agile Second place" },
        { title: "NanYing National Taekwondo Championship", date: "Apr.2.2022", detail: " - Group College and High School Girls First and Second Level, Third place" },
        { title: "City Youth Forum", date: "Dec.25-26.2020", detail: " - Final Prize in School Monographic Group" }
      ]
    },
    footer: {
      text: "© 2025 黃安華 (Annie) | Built with GitHub Pages"
    }
  },
  jp: {
    title: "黃安華 (Annie) | ポートフォリオ",
    logoName: "Annie Huang",
    nav: {
      about: "自己紹介",
      projects: "プロジェクト",
      skills: "スキル",
      experiences: "経歴",
      courses: "履修履歴",
      awards: "受賞歴と活動",
      journal: "📝 ジャーナル"
    },
    hero: {
      name: "黃安華 (Annie)",
      subtitles: [
        "電気工学 | 機械工学 | プログラミング",
        "デザイン | 音楽 | 語学学習 | テコンドー"
      ],
      aboutTitle: "自己紹介",
      aboutText: "私は強い好奇心を持つ人間です。様々な分野の活動を経験し、参加してきたことで、世界を観察する新しい視点を学び、未知の分野で学ぶことへの関心を築き上げました。また、私はクリエイターでもあり、自分の作品を作ることが大好きです。自分の考えや物語を表現するために、語学、イラスト、執筆、プログラミングなどのスキルを学びました。これらのスキルを活かして、快適な領域（コンフォートゾーン）から一歩踏み出し、目標を達成するために挑戦的な活動に参加し、視野を広げています。"
    },
    upcoming: {
      title: "今後の予定計画",
      items: [
        { name: "日本・北九州 NSW 夏季インターンシップ", date: "2026.07 - 2026.08" },
        { name: "大学院 (未定)", date: "" }
      ]
    },
    education: {
      title: "学歴",
      items: [
        {
          degree: "電気工学科 学士 / 教育学程",
          school: "国立台北科技大学 (台北)",
          date: "Sep.2024 - Jun.2026",
          note: ""
        },
        {
          degree: "知能自動化工学科 準学士",
          school: "国立台北科技大学 (台北)",
          date: "Sep.2019 - Jun.2024",
          note: "🎓 全学期 学業優秀奨学金 受賞"
        }
      ],
      accordionTitle: "早期英才教育と全人的発達",
      accordionSections: [
        {
          title: "ギフテッド教育",
          date: "2012-2019",
          paragraphs: [
            "多次元的システム思考：機械構造、電気制御、情報科学を統合し、複数の視点から複雑なエンジニアリングの課題を分析する習慣を養いました。これにより、他人が見落とす可能性のある「システムの不整合」や潜在的な非効率性を特定することができます。",
            "自主学習と資源統合：「世界が私の教室」という考え方を持っています。正式な指導を待つのではなく、自主的に研究を行い、多様なリソースを統合して、YOLOv10 や FPGA のような未知の技術を習得することに慣れています。",
            "戦略的実行とレジリエンス：複雑な問題の範囲を定め、現実的な制約の下で進捗を維持する経験があります。野心的なアイデアを反復するレジリエンスと、プレッシャーのかかる環境でタスクの優先順位を見極める実用的な判断力を培いました。"
          ]
        },
        {
          title: "音楽クラスとオーケストラ",
          date: "2012-2016(main)",
          paragraphs: [
            "主専攻パーカッション・副専攻ピアノ：様々な楽器（鍵盤打楽器や太鼓など）の長年にわたる厳しいトレーニングにより、高度な手と目の協調性、そして精度の要求されるタスクを習得するために必要な自己規律を養いました。",
            "音楽理論と聴音：音楽理論と聴音の体系的な学習により、パターン認識能力と抽象的な構造の論理的分析力を鍛えました。",
            "オーケストラとアンサンブルの経験：吹奏楽や弦楽アンサンブルでの活動は「チームワーク」の正確さを強調しました。パーカッショニストとして、グループの拍と安定性を維持する責任があり、このスキルは複数のラボユーザーの調整やシステムの同期維持に直接応用できます。"
          ]
        }
      ]
    },
    projects: {
      title: "プロジェクト",
      list: [
        {
          id: "angry-birds",
          title: "Angry Birds 完全復刻版（C++ / PTSDエンジン）",
          date: "Feb.2026 - Jun.2026",
          links: [
            { text: "💻 GitHub", url: "https://github.com/Annie04082020/Angry_Birds_Replica" },
            { text: "🎥 中間発表", url: "https://youtu.be/V9pe8lg6LLU" },
            { text: "🎥 期末発表", url: "https://youtu.be/aVP6Vbt74fo" }
          ],
          bullets: [
            "オブジェクト指向プログラミング実習（OOPL 2026春）の学期成果として、C++で Angry Birds を 1:1 完全復刻。",
            "物理パチンコ発射メカニズム、ユニークな特殊能力を持つ複数種類の鳥、さらに木・石・氷で述べられた豪の要塞を実装。",
            "PTSDアニメーションフレームワークをベースに構築。レンダリング、サウンド（SDL2_mixer + OGG/Vorbis）、衝突検出を包括。",
            "OOP設計原則の適用：鳥・豪・ブロック種の継承階層、ポリモーフィックな技能発動、コンポーネントベースのシーン管理。"
          ],
          modal: {
            processTitle: "開発プロセス",
            process: "PMとしてチームメンバー2名で一学期をかけて開発。パチンコの投射物理・多段階のブロック破壊・鳥の技能発動まで、全体のアーキテクチャを設計。PTSD（NTUT OSCのC++ 2Dゲームフレームワーク）を統合し、ステージロード・スコア計算・アニメーションパーティクルエフェクトなどのシステムを拡充実装。",
            detailsTitle: "技術ハイライト",
            bullets: [
              "<strong>物理システム</strong>：投射軌道シミュレーション（空気抗力あり）；円形と矩形の剛体衝突応答。",
              "<strong>鳥の能力</strong>：赤（標準）、黄（加速突辺）、青（三連分裂）、黒（爆発）、白（子走投下）。",
              "<strong>ブロック素材</strong>：木材 / 石材 / 氷 — それぞれ異なHP・質量・破壊アニメーション。",
              "<strong>サウンド</strong>：SDL2_mixer + OGG/Vorbisで発射音・衝突音・ BGM。",
              "<strong>ツール</strong>：C++17、CMake、SDL2、PTSDフレームワーク；WSL Ubuntu + Windowsで開発。"
            ]
          }
        },
        {
          id: "yolo-v10",
          title: "YOLOベースモデルを用いたSIXrayデータセットにおける禁制品識別性能の分析：YOLOv10を例として",
          date: "2025年12月 – 2026年3月 (卒業研究)",
          links: [
            { text: "📄 レポート PDF", url: "https://your-link-to-pdf.com/SIXrayYOLO_Report.pdf" }
          ],
          bullets: [
            "100万枚以上のX線画像を含むSIXrayデータセットを処理。極端な不均衡に対しクラスバランス・グルーピングとMosaic拡張を実装。",
            "RTX 3080制限下でYOLOv10 nano/smallモデルを学習。mAP（最大0.502）、遅延、FLOPsのトレードオフを分析。",
            "大規模モデルのVRAM溢れを特定。動的バッチサイズと学習率スケジューリングにより学習を安定化。",
            "YOLOv4_srと比較し、エッジデバイス向けセキュリティシステムにおけるYOLOv10の効率性を実証。"
          ],
          modal: {
            processTitle: "プロセスと詳細",
            process: "深刻なクラス不均衡を持つ大規模なX線データセットの処理を行いました。特定のハードウェア制限下で、高リスクなセキュリティ環境へ展開するためにYOLOv10を最適化することに焦点を当てました。カスタムのトレーニングループの実装や、データ拡張パラメータの評価、各種YOLOモデルにおける速度と精度の相関分析を実施しました。",
            detailsTitle: "詳しい情報",
            details: "関連スキル: Python, PyTorch, YOLOv10 (物体検出), データエンジニアリング, GPUリソース最適化。実験により、YOLOv10のsmall/nanoバージョンはリアルタイム組み込みセキュリティ検査機器への展開に極めて実用的であることが証明されました。"
          }
        },
        {
          id: "csl-car",
          title: "CSL 超音波自律走行車（ディスクリートHブリッジ制御）",
          date: "Sep.2025 - Jan.2026",
          links: [
            { text: "💻 GitHub", url: "https://github.com/Annie04082020/CSL_Ultrasonic_Car" }
          ],
          bullets: [
            "超音波センサーのフィードバックを利用した物体追跡および距離維持が可能な自律走行車。",
            "既製のモジュールを使用せず、ディスクリート素子（BJTおよびリレー）からカスタム設計されたHブリッジモータードライバーを構築。",
            "超音波センサーのノイズを除去するため、メディアンフィルタによる信号処理を実装。",
            "スムーズなモーター制御と旋回のために、デッドバンド付きのバンバン（Bang-Bang）制御アルゴリズムをArduino上で開発。"
          ],
          modal: {
            processTitle: "プロセスと詳細",
            process: "シャーシの設計・製作、カスタム回路レイアウト、およびモータードライバー基板の設計を完全にゼロから実施。超音波センサーを組み込み、メディアンフィルタを使用してノイズや誤反射を効果的に除去し、距離フィードバックを正確に校正。深いハードウェアレベルの理解を得るため、市販のHブリッジICを避け、ディスクリートトランジスタ回路を手作業で構築。",
            detailsTitle: "詳しい情報",
            details: "ディスクリート回路設計の実践的経験や、電気信号ノイズのデバッグ、旋回時の安定化用コントローラロジック（デッドバンド付きBang-Bang制御）の調整スキルを大幅に向上させました。"
          }
        },
        {
          id: "linux-odyssey",
          title: "Linux Odyssey: 対話型ターミナル学習用ウェブサイト",
          date: "Apr.2023 - Now",
          links: [
            { text: "🌐 Website", url: "https://linuxodyssey.xyz/" },
            { text: "💻 GitHub", url: "https://github.com/linux-odyssey/linux-odyssey" },
            { text: "プロジェクトイントロ", url: "https://youtu.be/XzvfmUf1QP8" }
          ],
          bullets: [
            "Javascript、TypeScript、Vue開発、テスト自動化、ビジュアルデザインを経験。",
            "第28回 InnoServe Awards Titansoft Agile部門 準優勝。",
            "Sch001 2023 プロジェクト育成コンペティションにて 最優秀賞を獲得。",
            "2024年秋学期より国立台北大学（NTPU）GDSCと提携協力。"
          ],
          modal: {
            processTitle: "プロセスと詳細",
            process: "Vueフレームワークとカスタムターミナルシミュレータを使用した対話型学習フロントエンドシステムを共同立ち上げ・開発。ユーザー体験向上のため複数回のユーザビリティテストを実施し、Cypressを用いた自動テストを導入。",
            detailsTitle: "詳しい情報",
            details: "台湾を代表するオープンソース教育プロジェクトとして評価され、g0v 零時小学校で首賞を受賞したほか、InnoServeのTitansoft Agile部門で準優勝を獲得。"
          }
        },
        {
          id: "music-block",
          title: "MIT City Science Lab 春学期 UROP：Music Block",
          date: "Feb.2023 - Jun.2023",
          links: [
            { text: "🎥 Concept Demo Video", url: "https://youtu.be/GiDZrVne1MY" },
            { text: "🎥 Final Demo Video", url: "https://youtu.be/RYG5qpFA1wA" }
          ],
          bullets: [
            "Music Blockは、「音楽」を視覚的な3Dの物体に変えるコンセプト製品であり、音楽初心者に基礎的な音楽理論を教え、音の感覚を養うことを目的としています。",
            "ゼロからのプロジェクト立ち上げ、プロジェクト管理、ファームウェア開発（C言語）を経験。",
            "ブロックおよびボトムボードのファームウェア開発を担当。"
          ],
          modal: {
            processTitle: "プロセスと詳細",
            process: "MIT CSLの研究員と緊密に連携し、ハードウェアインターフェースと相互作用方式を定義。マイクロコントローラ上のC言語でファームウェアを開発し、シリアル通信を介して各ブロックモジュールとメインボード間のサウンド合成出力を制御・調律。",
            detailsTitle: "詳しい情報",
            details: "動的な物理インタラクションプロトタイプの作成に成功し、音楽理論の学習における具体的な物理UIの教育的有効性を実験室メンバーへ実証しました。"
          }
        },
        {
          id: "behind-brewing",
          title: "Behind Brewing：コーヒーメーカーにおけるサーミスタとヒーターの役割",
          date: "Sep.2024 - Jan.2025",
          links: [
            { text: "📄 Poster", url: "https://drive.google.com/file/d/1SSEOqHq4tcBxyClBmXNReTBxNrtyTdih/view" },
            { text: "📄 Report", url: "https://drive.google.com/file/d/1RqWXQ3pm93QrQahQ7eKvH8Fp-MuJWMHF/view" }
          ],
          bullets: [
            "回路理論の授業で取り組んだ、現実世界における実用的な回路に関する研究および調査。",
            "元の回路の研究と、SIMetrixソフトウェア上でのシミュレーションを実施。",
            "パラメータを変更し、回路の特徴や違いを検証。",
            "特定の用途（コーヒー抽出）に合わせた回路の最適化を提案。"
          ],
          modal: {
            processTitle: "プロセスと詳細",
            process: "市販のドリップ式コーヒーメーカーの電気回路構成を分解・分析。SPICEソフトウェア（SIMetrix）で熱フィードバックループのシミュレーションモデルを構築し、理想的な92〜96℃抽出温度維持のための抵抗定数を再計算。",
            detailsTitle: "詳しい情報",
            details: "最適化した回路設計により、最初の温度オーバーシュートを15％削減。より安定した品質でのコーヒー抽出性能を実現しました。"
          }
        },
        {
          id: "leda",
          title: "LEDA Technology との共同プロジェクト",
          date: "May.2021 - Jan.2022",
          links: [],
          bullets: [
            "AI、フロントエンド、バックエンド開発の経験。",
            "陽明交通大学（NYCU）、中原大学（CYCU）の学生と協力し、AIを迅速に利用できるウェブサイトを構築。",
            "医師と協力し、データアノテーション用にCTファイルを画像ファイル（.jpg、.png）に変換するプログラムを作成。"
          ],
          modal: {
            processTitle: "プロセスと詳細",
            process: "医療用画像アノテーションの前処理パイプライン開発を支援。Pythonスクリプトを用いて医療規格のDICOM断層スライスデータを画像ファイル（PNG）に一括自動変換し、医師によるアノテーション作業の時間を短縮。",
            detailsTitle: "詳しい情報",
            details: "医療分野のインフォマティクスや法規制、産学連携における機密データハンドリング手順について早期に深く学ぶ機会となりました。"
          }
        },
        {
          id: "ptech",
          title: "P-TECH Call for Code",
          date: "May.2021 - Jul.2021",
          links: [
            { text: "Concept Video", url: "https://youtu.be/--OcSxoVX7c" },
            { text: "Concept Slides", url: "https://docs.google.com/presentation/d/1kZR2yPctm8VQH8OIeajCIA7lS9Dfmkyc1MmKePWYQAs/edit?usp=sharing" }
          ],
          bullets: [
            "パンデミック（COVID-19）に対応するシステムを設計。",
            "システムは2つのパートに分かれており、医療従事者向けのパートでは、十分な物資と人員を備えた最も近い場所を計算するための要件を取得。",
            "一般ユーザー向けのパートでは、迅速な簡易検査サイトと目的地を案内。"
          ],
          modal: {
            processTitle: "プロセスと詳細",
            process: "COVID-19の流行ピーク期に全メンバー完全遠端協調で医療用資源配分システムを設計。病院の在庫や空きベッド数に基づき自動配置を行うアルゴリズムを構築し、Web Mockupインターフェースを作成。",
            detailsTitle: "詳しい情報",
            details: "P-TECH Call for Codeコンテストに向けて開発した、災害対策や緊急資源配分をコアとするコンセプト提案です。"
          }
        },
        {
          id: "eco-game",
          title: "環境に優しいボードゲーム (Eco-Friendly Board Game)",
          date: "Sep.2021 - Jun.2022",
          links: [
            { text: "Game Instruction", url: "https://hackmd.io/@Shomes/SJ1QirDKF" }
          ],
          bullets: [
            "プロジェクト全体を通じてチームを組織し、主導。",
            "すべてのカードとマップの外観をデザイン。"
          ],
          modal: {
            processTitle: "プロセスと詳細",
            process: "炭素足跡やリサイクルなどの環境問題をテーマに、ゲームルールやパラメータのバランス設計を実施。ベクターツールを用いてボードマップ、カード等のビジュアルグラフィックやパッケージレイアウトをデザイン。",
            detailsTitle: "詳しい情報",
            details: "企画・広報・印刷など多様な役割のメンバーを統括・指導し、最終的に実際に遊べる実物ボードゲームサンプルの作成に成功しました。"
          }
        },
        {
          id: "python-game",
          title: "Pythonによるゲームプロジェクト",
          date: "Apr.2021 - Jul.2021",
          links: [
            { text: "Project Slides", url: "https://docs.google.com/presentation/d/1nZF0inf_-JHW2z7FZXvcIbVjg2AGMqM4QNqsCmTZZP0/edit?usp=sharing" }
          ],
          bullets: [
            "Pythonを使用してモノポリーゲームを設計。"
          ],
          modal: {
            processTitle: "プロセスと詳細",
            process: "Python言語を用い、ゲーム状態管理（ステートマシン）や、プレイヤーの行動規則、不動産取引ロジックなどをコンソール画面に表示する形でコーディング。",
            detailsTitle: "詳しい情報",
            details: "本プロジェクトを通じ、オブジェクト指向プログラミング（OOP）の基本概念や各種コレクション（配列や連想配列）、高度な条件分岐処理の設計手法を鍛えました。"
          }
        }
      ]
    },
    skills: {
      title: "プロフェッショナルスキル",
      list: [
        {
          category: "語学力",
          items: [
            { name: "中国語", detail: "ネイティブ", meta: "" },
            { name: "英語", detail: "TOEIC RL: 810, SW: 270 | IELTS O: 6.5 | GRE V: 145, Q: 158, AW: 3.5", meta: "" },
            { name: "日本語", detail: "JLPT N1 合格", meta: "" }
          ]
        },
        {
          category: "プログラミング言語",
          items: [
            { name: "Python, C, C++", detail: "", meta: "" },
            { name: "HTML, CSS, JavaScript / TypeScript", detail: "", meta: "" },
            { name: "Vue, Cypress", detail: "", meta: "" }
          ]
        },
        {
          category: "アート＆音楽パフォーマンス",
          items: [
            { name: "パーカッション（ソロ、オーケストラ）", detail: "", meta: "" },
            { name: "ピアノ（ソロ）", detail: "", meta: "" },
            { name: "トランペット、バリトン（オーケストラ）", detail: "", meta: "" },
            { name: "絵画、デザイン", detail: "", meta: "" }
          ]
        },
        {
          category: "スポーツ",
          items: [
            { name: "テコンドー 1段", detail: "", meta: "December.30.2022" },
            { name: "テコンドー 2段", detail: "", meta: "March.17.2023" }
          ]
        },
        {
          category: "資格とバッジ",
          isFullWidth: true,
          items: [
            { name: "経済部認定 3Dプリント積層造形エンジニア - 初級", detail: "", meta: "July.2023" },
            { name: "Google サイバーセキュリティ", detail: "", meta: "July.2025" },
            { name: "IBM SkillsBuild: Python for Data Science, Growth Behaviors", detail: "", meta: "May.2022, Oct.2023" }
          ]
        }
      ]
    },
    portfolio: {
      title: "コーディング作品集",
      subtitle: "🌐 ウェブサイト・ツール",
      items: [
        { title: "Angry Birds Replica", url: "https://github.com/Annie04082020/Angry_Birds_Replica", desc: " — C++ 1:1 Angry Birds 復刻（PTSD エンジン、SDL2、OOP クラス成果）" },
        { title: "Review Card Maker", url: "https://annie04082020.github.io/ReviewCardMaker/", desc: " — 薬用植物学復習用フラッシュカードツール，純粋な HTML/CSS/JS で構築" },
        { title: "線形代数アシスタント (Linear Algebra Assistant)", url: "https://annie04082020.github.io/linear_algebra_assistant/", desc: " — 線形代数計算ツール，授業の確認・演習用" },
        { title: "Linux Odyssey", url: "https://linuxodyssey.xyz/", desc: " — インタラクティブなLinux教育ウェブサイト (Vue)" },
        { title: "ポートフォリオウェブサイト", url: "https://annie04082020.github.io/", desc: " — 今ご覧のサイトです！(HTML/CSS/JS)" },
        { title: "💻 GitHub: Annie04082020", url: "https://github.com/Annie04082020", desc: " — その他のコード・プロジェクト" }
      ]
    },
    experiences: {
      title: "経歴",
      list: [
        {
          title: "サマーインターンシップ：AUO Corporation（友達光電）",
          company: "友達光電",
          date: "July.2022 - Aug.2022",
          bullets: [
            "AI、Python PyQt GUI 開発、YOLOv5、Labelmeアプリケーションを経験。",
            "AI検出システムの保守・運用。",
            "モデルの再学習のための追加の調整ツールを統合。",
            "異なる使用目的や製造状況に応じた追加のYOLOv5検出を統合。"
          ]
        },
        {
          title: "インターンシップ：International Business Machines (IBM) Corporation",
          company: "IBM",
          date: "July.2023 - Dec.2023",
          bullets: [
            "Cypressテスト自動化開発、JavaScriptを経験。",
            "テストファイルの修正と新規作成。",
            "自動化テストを通じてウェブサイトの問題を特定。"
          ]
        },
        {
          title: "役員：テコンドー部 副部長",
          company: "テコンドー部",
          date: "July.2022 - Now",
          bullets: [
            "クラブエキスポおよび学園祭の企画・運営。",
            "クラブの運営と維持を管理。"
          ]
        },
        {
          title: "クラブ公演：テコンドー部",
          company: "テコンドー部",
          date: "2022 - 2026",
          bullets: [
            "個人およびグループでのパフォーマンス"
          ]
        },
        {
          title: "技術コミュニティと講演",
          company: "",
          date: "",
          bullets: [
            "2024 「気軽な勧誘」NTUT 共有会：登壇者 (Linux Odyssey)",
            "2024 COSCUP（オープンソースカンファレンス）",
            "2024 SITCON（学生ITカンファレンス）：Linux Odyssey ワークショップ",
            "g0v（gov-zero）ハッカソン：プロジェクト提案とクラウドファンディング"
          ]
        },
        {
          title: "エンジニアリング研修・展示会",
          company: "",
          date: "",
          bullets: [
            "2025 台北国際航空宇宙・防衛産業展 (TADTE)",
            "2025 国家スマートドローン専門人材育成プログラム",
            "2023 航空整備産業の現状と発展に関する研修"
          ]
        },
        {
          title: "コンテスト",
          company: "",
          date: "",
          bullets: [
            "2024 大学ITイノベーション＆起業家精神コンテスト:新起業トラック（セカンドラウンド進出）",
            "第22回 kWデザイン賞",
            "2021 GiCS（Girls in CyberSecurity）"
          ]
        },
        {
          title: "スポーツ大会",
          company: "",
          date: "",
          bullets: [
            "2026 全国大学総合体育大会：テコンドー・プムセ",
            "2025 全国大学総合体育大会：テコンドー・スパーリング",
            "2023 全国大学サッカーリーグ：男子2部"
          ]
        },
        {
          title: "フォーラム",
          company: "",
          date: "",
          bullets: [
            "2020 新世代ユースシティフォーラム"
          ]
        }
      ]
    },
    courses: {
      title: "履修履歴",
      categories: [
        {
          title: "IAE 必修科目",
          items: [
            { domain: "EECS", name: "人工知能", date: "Sep.2023 - Jan.2024" },
            { domain: "EECS", name: "センサーとIoT", date: "Sep.2023 - Jan.2024" },
            { domain: "ME", name: "ロボット工学及び実験", date: "Feb.2023 - Jun.2023" },
            { domain: "EECS", name: "マシンビジョン及び実験", date: "Feb.2023 - Jun.2023" },
            { domain: "ME", name: "機械設計", date: "Feb.2023 - Jun.2023" },
            { domain: "EECS", name: "通信とネットワーク", date: "Sep.2022 - Jan.2023" },
            { domain: "Systems", name: "知能制御", date: "Sep.2022 - Jan.2023" },
            { domain: "ME", name: "機械工学実験 I", date: "Sep.2022 - Jan.2023" },
            { domain: "ME", name: "機械運動学", date: "Sep.2022 - Jan.2023" },
            { domain: "Systems", name: "メカトロニクス及び実験", date: "Feb.2022 - Jun.2022" },
            { domain: "ME", name: "材料力学", date: "Feb.2022 - Jun.2022" },
            { domain: "ME", name: "動力学", date: "Sep.2021 - Jan.2022" },
            { domain: "EECS", name: "ディープラーニング (TensorFlow)", date: "Sep.2021 - Jan.2022" },
            { domain: "ME", name: "プログラマブルロジックコントローラ及び実験", date: "Feb.2021 - Jun.2021" },
            { domain: "ME", name: "静力學", date: "Feb.2021 - Jun.2021" },
            { domain: "ME", name: "製造プロセス", date: "Feb.2021 - Jun.2021" },
            { domain: "ME", name: "工学材料", date: "Feb.2021 - Jun.2021" },
            { domain: "ME", name: "CNC工作機械及び実験", date: "Sep.2020 - Jan.2021" },
            { domain: "ME", name: "空気圧・油圧工学", date: "Sep.2020 - Jan.2021" },
            { domain: "EECS", name: "人工知能概論", date: "Feb.2020 - June.2020" },
            { domain: "ME", name: "機械基礎実習 I, II", date: "Sep.2019 - Jan.2020, Feb.2020 - Jun.2020" },
            { domain: "EECS", name: "計算機科学概論", date: "Sep.2019 - Jan.2020" },
            { domain: "ME", name: "図学", date: "Sep.2019 - Jan.2020" },
            { domain: "ME", name: "コンピュータ支援設計 (CAD)", date: "Sep.2019 - Jan.2020" },
            { domain: "Systems", name: "人工知能概論", date: "Feb.2020 - June.2020" }
          ]
        },
        {
          title: "EE 必修科目",
          items: [
            { dept: "CSIE", name: "オブジェクト指向プログラミング実験", date: "Feb.2026 - Jun.2026" },
            { dept: "ECE", name: "アドバンストFPGA設計", date: "Feb.2026 - Jun.2026" },
            { dept: "EE", name: "線形代数", date: "Feb.2026 - Jun.2026" },
            { dept: "EE", name: "ディジタル論理回路設計実験", date: "Feb.2026 - Jun.2026" },
            { dept: "EE", name: "通信システム実験", date: "Feb.2026 - Jun.2026" },
            { dept: "EE", name: "衛星リモートセンシング応用及び実験", date: "Sep.2025 - Jan.2026" },
            { dept: "EE", name: "制御システム実験", date: "Sep.2025 - Jan.2026" },
            { dept: "CSIE", name: "オブジェクト指向プログラミング", date: "Sep.2025 - Jan.2026" },
            { dept: "EE", name: "パワーエレクトロニクス", date: "Sep.2025 - Jan.2026" },
            { dept: "EE", name: "パワーエレクトロニクス実験", date: "Feb.2025 - Jun.2025" },
            { dept: "EE", name: "マイクロプロセッサ", date: "Feb.2025 - Jun.2025" },
            { dept: "EE", name: "電気回路 II", date: "Feb.2025 - Jun.2025" },
            { dept: "EE", name: "電子工学 II", date: "Feb.2025 - Jun.2025" },
            { dept: "EE", name: "ディジタルシステム", date: "Sep.2024 - Jan.2025" },
            { dept: "EECS Class", name: "電子工学実験 I, II", date: "Sep.2024 - Jan.2025, Feb.2025 - Jun.2025" },
            { dept: "EE", name: "信号とシステム", date: "Sep.2024 - Jan.2025" },
            { dept: "ECE", name: "電気回路 I", date: "Sep.2024 - Jan.2025" },
            { dept: "CSIE", name: "離散数学", date: "Feb.2024 - Jun.2024" },
            { dept: "CSIE", name: "データ構造", date: "Sep.2023 - Jan.2024" },
            { dept: "IAE", name: "確率と統計", date: "Feb.2023 - Jun.2023" },
            { dept: "IAE", name: "マイクロプロセッサ及び実験", date: "Feb.2022 - Jun.2022" },
            { dept: "IAE", name: "自動制御及び実験", date: "Feb.2022 - Jun.2022" },
            { dept: "IAE", name: "電気機器", date: "Feb.2022 - Jun.2022" },
            { dept: "IAE", name: "ディジタル論理及び実験", date: "Sep.2021 - Jan.2022" },
            { dept: "IAE", name: "電子工学及び実験", date: "Sep.2021 - Jan.2022" },
            { dept: "IAE", name: "コンピュータプログラミング及び実験", date: "Sep.2020 - Jan.2021, Feb.2021 - Jun.2021" }
          ]
        },
        {
          title: "分野横断・自由選択",
          items: [
            { dept: "CSIE", name: "オブジェクト指向プログラミング実験", date: "Feb.2026 - Jun.2026" },
            { dept: "ECE", name: "アドバンストFPGA設計", date: "Feb.2026 - Jun.2026" },
            { dept: "TMU Pharmacy", name: "薬用植物学", link: { text: "Review Card Maker", url: "https://annie04082020.github.io/ReviewCardMaker/" }, date: "Sep.2025 - Jan.2026" },
            { dept: "Education", name: "ガイダンスの原理と実践", date: "Sep.2025 - Jan.2026" },
            { dept: "Education", name: "学習評価", date: "Feb.2025 - Jun.2025" },
            { dept: "Education", name: "教育心理学", date: "Sep.2024 - Jan.2025" },
            { dept: "Arch", name: "建築構造システム", date: "Sep.2023 - Jan.2024" },
            { dept: "Arch", name: "建築計画学", date: "Sep.2023 - Jan.2024" },
            { dept: "IAE", name: "3Dプリント及び実習", date: "Sep.2023 - Jan.2024" },
            { dept: "IAE", name: "ネットワークプログラミング", date: "Sep.2022 - Jan.2023" },
            { dept: "IEM", name: "クラウドアプリ開発と実践", date: "Sep.2022 - Jan.2023" },
            { dept: "IAE", name: "回路設計及び実験", date: "Feb.2022 - Jun.2022" },
            { dept: "IAE", name: "インダストリー4.0講座", date: "Feb.2022 - Jun.2022" },
            { dept: "ID", name: "コンピュータ支援ビジュアルデザイン", link: { text: "作品集", url: "https://drive.google.com/file/d/1KgDQrJPf-aZk-drospd4g466EOqj9kUw/view" }, date: "Sep.2021 - Jan.2022" },
            { dept: "IAE", name: "特許法概論", date: "Feb.2021 - Jun.2021" },
            { dept: "Club", name: "Share@AI Coding Club in NTUT", date: "Jan.2021 - May.2021" },
            { dept: "IAE", name: "Matlab/Simulinkプログラミング", date: "Sep.2020 - Jan.2021" },
            { dept: "IAE", name: "ドイツ語 I, II", date: "Sep.2019 - Jan.2020, Feb.2024 - Jun.2024" },
            { dept: "IAE", name: "日本語 I, II, III", date: "Sep.2019 - Jan.2020, Feb.2020 - Jun.2020, Sep.2020 - Jan.2021" }
          ]
        }
      ]
    },
    awards: {
      title: "受賞歴と活動",
      list: [
        { title: "Sch001 2023 Project Incubation Competition", date: "March.2.2024", detail: " - 最優秀賞" },
        { title: "InnoServe Awards 28th", date: "Nov.7.2023", detail: " - Titansoft Agile 準優勝" },
        { title: "NanYing National Taekwondo Championship", date: "Apr.2.2022", detail: " - 大学・高校女子団体の部 第3位" },
        { title: "City Youth Forum", date: "Dec.25-26.2020", detail: " - 校内モノグラフィック部門 優秀賞" }
      ]
    },
    footer: {
      text: "© 2025 黄金華 (Annie) | Built with GitHub Pages"
    }
  }
}
