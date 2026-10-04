window.PORTFOLIO_CONFIG = {

  /* --- who I am ------------------------------------------------------- */
  identity: {
    name: "Henry Ho",                 // ->
    initials: "HH",                    // -> shown in the logo box
    role: "Cybersecurity & Engineering Student",
    location: "Winnipeg, MB Canada",    // ->
    school: "Pembinatrails Collegiate",        // ->
    grade: "Grade 12",                 // ->
    email: "henryho9926@gmail.com",          // ->
    resumeUrl: "",                     // -> put a hosted PDF URL here to show a "Resume" button
    status: "Focused on my education, but open to internships"
  },

  /* --- terminal and stuff ------------------------------------------------- */
  hero: {
    kicker: "Portfolio · 2026",
    greeting: "Hi, I'm",
    // these cycle one after another under Henry Ho
    roles: ["a cybersecurity student", "an aspiring security engineer", "a CTF player"],
    lead: "I take things apart to understand how they work, then put them back together better. Right now I'm a high-school student going deep on networks, Linux and low-level engineering and documenting all of it.",
    // the fake terminal next to the hero
    terminal: {
      title: "bash — portfolio",
      lines: [
        { p: "$ ", c: "whoami" },
        { out: "student · security · engineering", cls: "k" },
        { p: "$ ", c: "cat interests.txt" },
        { out: "networking, linux, reverse-eng, vibe coding", cls: "k" },
        { p: "$ ", c: "ls ./currently" },
        { out: "tryhackme/  CTF/  documentation/  writeups/", cls: "u" },
        { p: "$ ", c: "echo $GOAL", cls: "" },
        { out: "networking, hardware, ai", cls: "c" }
      ]
    }
  },

  stats: [
    { value: "4", label: "competition attended"},
    { value: "Several", label: "CTFs played" },
    { value: "3",  label: "Projects built" },
    { value: "5",  label: "Languages coded" }
  ],

  ticker: ["Networking", "Linux", "Python", "Web security", "Reverse engineering", "Vibe coder", "CTFs", "Home lab", "Self driven projects", "Automation"],

  /* --- about me ------------------------------------------------------------- */
  about: {
    kicker: "About",
    heading: "Curious by default, security-minded by choice.",
    // each string becomes a paragraph; wrap text in <b>…</b> to highlight it
    paragraphs: [
      "I'm a high-school student who got hooked on computers and robots by wanting to know <b>why</b> things work and then why they break. What started as taking apart old laptops and calculators turned into a genuine interest in IT, learning Linux properly, and spending occasional free time on CTFs and TryHackMe rooms.",
      "I care about understanding systems from the ground up: how packets actually move, how memory is laid out, how a microcontroller talks to a sensor. I'd rather build something small and finish it than dream about something huge.",
      "Right now I'm looking for <b>internships, mentorship, and open-source projects</b> where I can learn from people who know more than me."
    ],
    facts: [
      { k: "Based in", v: "Winnipeg" },
      { k: "School", v: "Grade 12" },
      { k: "Focus", v: "Security & engineering" },
      { k: "Now", v: "Learning & building" }
    ],
    chips: ["Network security", "Linux internals", "Reverse engineering", "Vibe Coding", "CTFs", "Python", "Automation"]
  },

  /* --- skills ---------- */
  skills: {
    kicker: "Toolkit",
    heading: "What I can actually do right now.",
    intro: "Honest self-assessment — the bars are where I am today, not where I want to be. Everything here I've used on a real project or challenge, not just watched a video about.",
    groups: [
      { group: "Security", icon: "shield", items: [
        { name: "Networking & traffic analysis", level: 25 },
        { name: "Linux hardening & permissions", level: 80 },
        { name: "Recon & enumeration (Nmap, Wireshark)", level: 10 },
        { name: "Web security fundamentals", level: 80 },
        { name: "Cryptography basics", level: 80 }
      ]},
      { group: "Programming", icon: "code", items: [
        { name: "Python", level: 50 },
        { name: "Bash / shell scripting", level: 80 },
        { name: "JavaScript & the web platform", level: 30 },
        { name: "html", level: 50 },
      ]},
      { group: "Systems & tools", icon: "terminal", items: [
        { name: "Linux/Unix (my main OS)", level: 90 },
        { name: "VMware, Oracle & other virtual machines", level: 75 },
        { name: "Git & GitHub", level: 70 },
        { name: "Wireshark / Nmap / Burp", level: 30 }
      ]},
      { group: "Engineering", icon: "cpu", items: [
        { name: "Electronics & breadboarding", level: 30 },
        { name: "3D printing & CAD (Fusion 360)", level: 50 },
      ]}
    ]
  },

  /* --- projects ---------------------------------------------------------
     */
  projects: {
    kicker: "Work",
    heading: "Things I've built and broken.",
    intro: "A mix of security, software and hardware. Click any card for the full story.",
    items: [
      {
        id: "homelab",
        title: "Segmented Home Lab",
        year: "2025 — now",
        icon: "terminal",
        blurb: "A VLAN-segmented home network with its own firewall rules, IDS and a deliberately vulnerable target range.",
        tags: ["Networking", "Linux", "Security"],
        tech: ["pfSense", "Proxmox", "Suricata", "Kali"],
        repo: "https://github.com/yourusername/homelab",
        demo: "",
        body: "I wanted a place to break things safely, so I built a small virtualised network that mirrors how a real one is put together. The router/firewall sits between VLANs for trusted devices, IoT junk, and an isolated attack range. Traffic between them is default-deny with explicit allow rules, and an IDS watches the boundary so I can see what my own scans and exploits look like from the defending side.",
        highlights: [
          "Three VLANs with default-deny firewall policy and logging on every drop",
          "Suricata on a mirrored port, tuned so my own nmap scans produce readable alerts",
          "Rebuilt the whole environment from an Ansible playbook so it's reproducible",
          "Ran my first end-to-end red-team/blue-team exercise against it, solo"
        ]
      },
      {
        id: "ldap",
        title: "Created a LDAP server and connected it to client via virtual machine",
        year: "2025 — 2026",
        icon: "server",
        blurb: "Notes taken and created script to automate addition of users as well of deletion of users",
        tags: ["Security", "User Management", "Client-Server Model"],
        tech: ["Linux", "Git", "LDAP","File Systems"],
        repo: "https://github.com/123Henry123/Henry-Notes/tree/main/Henry%20vault/LDAP",
        demo: "https://yourusername.github.io/ctf-writeups",
        body: "Throughout this experience I learned more about DNS and how it interacts with the client",
        highlights: [
          "Able to add at least 40 users, place them into their respective groups, automatically create hashed passwords, and include their age name and birthday",
          "Able to login on client side using server side credentials",
          "Unfortunately there is no demo as the VM's have been deleted"
        ]
      },
      {
        id: "documentation",
        title: "documentation of knowledge",
        year: "2024 - present",
        icon: "note",
        blurb: "A organised package comprised of my learning, skills, and experiences",
        tags: ["Documentation", "Software"],
        tech: ["Github", "Obsidian", "File Structure"],
        repo: "https://github.com/123Henry123/Henry-Notes/tree/main/Henry%20vault/Notes",
        demo: "",
        body: "Every step is documented nothing is left out, including what worked and what didn't work.",
        highlights: [
          "Documented my knowledge on logic gates, networking, and data types",
          "Notes about permissions (octal notation)",
          "Learned about computer parts and structure, and linux comands",
        ]
      }
    ]
  },

  /* --- timeline  ------------------- */
  timeline: {
    kicker: "Path",
    heading: "How I got here.",
    items: [
      { when: "2025", kind: "problem solving", title: "First CTF competition",
        org: "Pico CTF", desc: "Placed in the top 10% competing with a small handful of people in my first proper capture-the-flag event. Spent a while researching various ways to hide flags" },
      { when: "2024 — 2025", kind: "work", title: "Robotics club — control systems",
        org: "School robotics club", desc: "Owned the PID control loop for our line-follower robot and the tooling we used to tune it. Learned that real hardware never behaves the way the datasheet promises." },
      { when: "2024-present", kind: "competition", title: "CyberPatriot",
        org: "Team competition", desc: "This is a competition the runs annually for middle school and high school students. Through the competition I learned how to harden various Linux and Windows operating systems from an admins perspective. I also learned networking eg, ip address, subnet mask, and various other protocols."},
      { when: "2024", kind: "education", title: "Documentation and permissions",
        org: "In class", desc: "Around this time I was introduced to github and its functions. I started documenting everything I've learned and problems I faced. I was also taught file permissions how to modify them and optimal settings." },
      { when: "2023", kind: "education", title: "Intro to terminal and ethics",
        org: "In class", desc: "Started with binary and boolean the very basics. Learned about Linux and virtual machines as well as how to navigate the file system using the terminal in linux and powershell in windows. At the same time I learned about ethics and the moral standards expected of and individual working the the cybesecurity field." }
    ]
  },

  /* --- achievements imma do this later ------------------------------------------------------ */
  achievements: {
    kicker: "proof",
    heading: "Certifications and competitions (coming soon)",
    certifications: [
      
    ],
    ctf: [
    ]
  },

  /* --- contact ----------------------------------------------------------- */
  contact: {
    kicker: "Contact",
    heading: "Let's build something.",
    blurb: "Whether it's an internship, a CTF team, a project to collaborate on, or just feedback on something here — my inbox is open and I reply to everything.",
    socials: [
      { label: "GitHub",      url: "https://github.com/123Henry123",          icon: "github" },
      { label: "Email",       url: "henryho9926@gmail.com",                   icon: "mail" }
    ]
  }
};
