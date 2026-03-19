// ─── Types ───

export interface LessonStep {
  title: string;
  content: string;
  tip?: string;
  image?: string; // description of what would be shown
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "theory" | "interactive" | "quiz" | "project";
  description: string;
  steps: LessonStep[];
  quiz?: QuizQuestion[];
  keyCommands?: string[];
  practiceTask?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  duration: string;
  tags: string[];
  modules: Module[];
}

// ─── Courses ───

export const courses: Course[] = [
  {
    id: "fundamentals",
    title: "AutoCAD Fundamentals",
    subtitle: "Master the Basics",
    description:
      "Build a rock-solid foundation in AutoCAD. Learn the interface, essential drawing tools, coordinate systems, and basic editing commands every architect needs.",
    icon: "Compass",
    color: "#007AFF",
    level: "Beginner",
    duration: "12 hours",
    tags: ["Interface", "Drawing", "Coordinates"],
    modules: [
      {
        id: "fund-m1",
        title: "Getting Started with AutoCAD",
        description: "Navigate the workspace and understand how AutoCAD thinks.",
        lessons: [
          {
            id: "fund-1-1",
            title: "The AutoCAD Interface",
            duration: "15 min",
            type: "theory",
            description: "Learn every part of the AutoCAD screen so you never feel lost.",
            steps: [
              {
                title: "The Application Menu (Big A)",
                content:
                  "When you open AutoCAD, look at the very top-left corner. You'll see the big red 'A' — this is the Application Menu. Click it to access:\n\n• **New** — create a new drawing (.dwg file)\n• **Open** — open an existing drawing\n• **Save / Save As** — save your work (always use Ctrl+S frequently!)\n• **Export** — export to PDF or other formats\n• **Print/Plot** — print your drawings\n\nThink of this as AutoCAD's 'File' menu. You'll use **New**, **Save**, and **Plot** the most.",
                tip: "Get in the habit of pressing Ctrl+S every few minutes. AutoCAD can crash, and losing work is painful.",
              },
              {
                title: "The Ribbon",
                content:
                  "The Ribbon is the wide toolbar across the top of your screen. It's organized into **Tabs** and **Panels**:\n\n• **Home tab** — your most-used tools: Line, Circle, Move, Copy, etc.\n• **Insert tab** — for inserting blocks, references, and images\n• **Annotate tab** — dimensions, text, leaders\n• **View tab** — viewports, visual styles, navigation\n• **Parametric tab** — geometric and dimensional constraints\n\nEach tab has **Panels** (groups of related tools). For example, the Home tab has:\n- **Draw** panel: Line, Polyline, Circle, Arc, Rectangle\n- **Modify** panel: Move, Copy, Rotate, Mirror, Trim, Extend\n- **Layers** panel: Layer controls\n- **Annotation** panel: Quick text and dimensions\n\nYou'll spend 90% of your time in the **Home** tab.",
                tip: "You can collapse the ribbon by double-clicking any tab name. Double-click again to expand it.",
              },
              {
                title: "The Drawing Area (Model Space)",
                content:
                  "The large black area in the center is your **Model Space** — this is your infinite drawing canvas. Key things to know:\n\n• It extends infinitely in all directions\n• The **crosshair cursor** (+) follows your mouse\n• The **UCS icon** (the L-shaped arrows at bottom-left) shows your coordinate orientation\n• You draw at **real-world scale** — a 10-meter wall is drawn as 10 meters\n• Use your **mouse scroll wheel** to zoom in/out\n• Hold the **scroll wheel button** (middle click) and drag to pan\n\nModel Space is where you create your actual design. Think of it as an infinitely large sheet of paper.",
                tip: "If you ever get lost (zoomed too far in/out), type ZOOM then E (for Extents) to see everything in your drawing.",
              },
              {
                title: "The Command Line",
                content:
                  "The **Command Line** at the bottom of the screen is AutoCAD's most powerful feature. This is where you type commands and AutoCAD talks back to you.\n\n**How it works:**\n1. Type a command name (e.g., LINE) and press Enter\n2. AutoCAD prompts you for input (e.g., 'Specify first point:')\n3. You respond by clicking in the drawing or typing coordinates\n4. AutoCAD prompts for the next input\n5. Press Enter or Escape to finish\n\n**Why it matters:**\nProfessional drafters are 3-5x faster using the command line than clicking ribbon buttons. Every button in the ribbon is just a shortcut to a command.\n\n**Examples:**\n• Type `L` + Enter → starts the LINE command\n• Type `C` + Enter → starts the CIRCLE command\n• Type `M` + Enter → starts the MOVE command\n\nAlways read what the command line says — it tells you exactly what AutoCAD expects next.",
                tip: "Press F2 to expand the command line into a text window showing your full command history.",
              },
              {
                title: "Layout Tabs and Status Bar",
                content:
                  "**Layout Tabs** (bottom of screen, above command line):\n• **Model** tab — where you draw (infinite space, real scale)\n• **Layout1, Layout2** tabs — where you set up for printing\n• Layouts contain **viewports** — windows looking into Model Space\n• Think of it like: Model = your design, Layout = your printed sheet\n\n**Status Bar** (very bottom):\nToggle buttons that control drawing aids:\n• **SNAP** (F9) — cursor snaps to grid points\n• **GRID** (F7) — shows a dot grid for reference\n• **ORTHO** (F8) — restricts drawing to horizontal/vertical only\n• **OSNAP** (F3) — snaps to object features (endpoints, midpoints, centers)\n• **POLAR** (F10) — guides at specific angles\n\n**OSNAP is the most important.** Turn it on and keep it on — it ensures your lines connect precisely to other objects.",
                tip: "Right-click any status bar button to configure its settings. For OSNAP, make sure Endpoint, Midpoint, Center, and Intersection are checked.",
              },
            ],
            quiz: [
              {
                question: "Where do you draw your actual design in AutoCAD?",
                options: ["Layout tab", "Model Space", "The Ribbon", "Command Line"],
                correctIndex: 1,
                explanation:
                  "Model Space is your infinite drawing canvas where you create designs at real-world scale. Layout tabs are for setting up print sheets.",
              },
              {
                question: "What is the fastest way to start the LINE command?",
                options: [
                  "Click the Line button on the ribbon",
                  "Go to Application Menu > Line",
                  "Type L and press Enter",
                  "Right-click and select Line",
                ],
                correctIndex: 2,
                explanation:
                  "Typing L + Enter in the command line is the fastest way. Professional drafters rely on keyboard shortcuts.",
              },
              {
                question: "Which status bar toggle ensures your lines snap precisely to endpoints and midpoints of other objects?",
                options: ["SNAP", "GRID", "ORTHO", "OSNAP"],
                correctIndex: 3,
                explanation:
                  "OSNAP (Object Snap, F3) makes your cursor snap to geometric features of existing objects — endpoints, midpoints, centers, intersections, etc.",
              },
            ],
          },
          {
            id: "fund-1-2",
            title: "Setting Up Your Drawing",
            duration: "12 min",
            type: "interactive",
            description: "Configure units, limits, and workspace for architectural drafting.",
            steps: [
              {
                title: "Setting Drawing Units",
                content:
                  "Before drawing anything, set your units. Type `UNITS` and press Enter.\n\n**For architectural drawings:**\n• **Length Type:** Decimal (for metric) or Architectural (for imperial)\n• **Precision:** 0.00 (2 decimal places is enough for most work)\n• **Angle Type:** Decimal Degrees\n• **Angle Precision:** 0 (whole degrees)\n\n**Metric vs Imperial:**\n• Metric: 1 unit = 1 millimeter (draw a 5000mm wall as 5000 units)\n• Imperial: 1 unit = 1 inch (draw a 10'-0\" wall as 120 units)\n\nMost architecture schools now use metric. Ask your professor which system to use.",
                tip: "In metric, architects typically work in millimeters. A standard door is 900mm wide, a wall is 200mm thick.",
              },
              {
                title: "Setting Drawing Limits",
                content:
                  "Drawing limits define the area you'll work in. Type `LIMITS` and press Enter.\n\n**For an A3 sheet at 1:100 scale (metric):**\n1. Lower-left corner: `0,0` (press Enter)\n2. Upper-right corner: `42000,29700` (press Enter)\n   (A3 = 420mm × 297mm, × 100 scale = 42000 × 29700)\n\n**For a small residential plan:**\n• Lower-left: `0,0`\n• Upper-right: `30000,20000` (30m × 20m space)\n\nAfter setting limits, type `ZOOM` then `A` (for All) to see the full area.\n\n**Common scales:**\n• 1:50 — detailed plans, sections\n• 1:100 — floor plans, elevations\n• 1:200 — site plans\n• 1:500 — location plans",
                tip: "Don't stress about limits too much. Model Space is infinite — limits just help with the grid display and zooming.",
              },
              {
                title: "Configuring Object Snap (OSNAP)",
                content:
                  "This is crucial for precision. Type `OSNAP` or press F3 to toggle, then right-click the OSNAP button on the status bar and choose 'Settings'.\n\n**Must-have snaps for architecture:**\n✓ **Endpoint** — snap to ends of lines, arcs\n✓ **Midpoint** — snap to middle of lines, arcs\n✓ **Center** — snap to center of circles, arcs\n✓ **Intersection** — snap where objects cross\n✓ **Perpendicular** — snap at right angles to objects\n✓ **Nearest** — snap to nearest point on an object\n\n**Optional but useful:**\n✓ **Quadrant** — snap to 0°, 90°, 180°, 270° on circles\n✓ **Tangent** — snap tangent to circles and arcs\n\n**Keep off** (these cause accidental snaps):\n✗ Node\n✗ Insert\n✗ Apparent Intersection\n\nOSNAP makes AutoCAD precise. Without it, your lines will never truly connect, causing problems later.",
                tip: "Hold Shift + Right-click while in a command to access a one-time snap override menu. This lets you temporarily snap to a specific point type.",
              },
              {
                title: "Saving Your Template",
                content:
                  "Once you've set up units, limits, and OSNAP, save it as a template so you don't repeat this setup:\n\n1. Go to Application Menu > **Save As**\n2. Change 'Files of type' to **AutoCAD Drawing Template (*.dwt)**\n3. Name it something like `Arch-Metric-A3.dwt`\n4. Save to your templates folder\n\nNext time you start a new drawing:\n1. Application Menu > **New**\n2. Select your template\n3. Start drawing immediately with all your settings ready!\n\n**What to include in your template:**\n• Units and precision\n• Layer setup (we'll learn this later)\n• Dimension styles\n• Text styles\n• Title block in Layout",
                tip: "Create templates for different drawing types: one for plans, one for details, one for site plans. It saves hours over a semester.",
              },
            ],
            keyCommands: ["UNITS", "LIMITS", "ZOOM", "OSNAP", "SAVEAS"],
            practiceTask:
              "Set up a new drawing with metric units (millimeters), set limits to 30000,20000, configure OSNAP with Endpoint/Midpoint/Center/Intersection/Perpendicular, and save it as a template.",
          },
          {
            id: "fund-1-3",
            title: "Coordinate Systems",
            duration: "20 min",
            type: "theory",
            description:
              "Master the three ways to tell AutoCAD exactly where to place points.",
            steps: [
              {
                title: "Why Coordinates Matter",
                content:
                  "In architecture, precision is everything. A wall that's 1mm off doesn't matter. A wall that's 100mm off means your room is the wrong size.\n\nAutoCAD uses a Cartesian coordinate system (X, Y) to locate every point. There are **3 ways** to input points:\n\n1. **Absolute coordinates** — measured from the origin (0,0)\n2. **Relative coordinates** — measured from your last point\n3. **Polar coordinates** — distance + angle from your last point\n\nMost architects use **relative coordinates** 90% of the time. Let's learn all three.",
              },
              {
                title: "Absolute Coordinates",
                content:
                  "**Format:** `X,Y`\n\nAbsolute coordinates are measured from the origin point (0,0) of your drawing.\n\n**Example — Drawing a line from (1000,1000) to (5000,3000):**\n1. Type `L` + Enter (start LINE command)\n2. Type `1000,1000` + Enter (first point)\n3. Type `5000,3000` + Enter (second point)\n4. Press Enter to finish\n\nThis draws a diagonal line from point (1000,1000) to point (5000,3000).\n\n**When to use:**\n• Placing the first point of your drawing\n• Positioning objects at exact locations\n• Rarely used after the first point — relative is easier\n\n**Problem with absolute:**\nYou need to calculate every point's position from (0,0). For a floor plan, this means adding up all your room dimensions manually. That's why we use relative coordinates instead.",
                tip: "Think of absolute coordinates like GPS coordinates — they tell you exactly where something is on Earth (or in your drawing).",
              },
              {
                title: "Relative Coordinates",
                content:
                  "**Format:** `@X,Y` (the @ means 'relative to my last point')\n\nRelative coordinates measure from wherever your cursor last clicked or your last point was entered.\n\n**Example — Drawing a 6000mm × 4000mm rectangle using LINE:**\n1. Type `L` + Enter\n2. Click anywhere to place the first corner (or type `0,0`)\n3. Type `@6000,0` + Enter → draws 6000mm to the right\n4. Type `@0,4000` + Enter → draws 4000mm up\n5. Type `@-6000,0` + Enter → draws 6000mm to the left\n6. Type `C` + Enter → closes back to the start\n\n**Breaking it down:**\n• `@6000,0` → move 6000 in X (right), 0 in Y (no vertical change)\n• `@0,4000` → move 0 in X, 4000 in Y (straight up)\n• `@-6000,0` → move -6000 in X (left), 0 in Y\n• `C` → close to start point\n\n**This is the method you'll use most in architecture.** You're essentially saying 'from here, go this far in this direction.'",
                tip: "Negative values go left (X) or down (Y). So @-3000,-2000 means 3000 left and 2000 down from your current point.",
              },
              {
                title: "Polar Coordinates",
                content:
                  "**Format:** `@distance<angle`\n\nPolar coordinates specify a distance and angle from your last point.\n\n**Angles in AutoCAD:**\n• 0° = East (right)\n• 90° = North (up)\n• 180° = West (left)\n• 270° = South (down)\n\n**Example — Drawing a line 5000mm long at 45 degrees:**\n1. Type `L` + Enter\n2. Click a start point\n3. Type `@5000<45` + Enter → 5000mm at 45°\n\n**Example — Drawing an equilateral triangle (3000mm sides):**\n1. `L` + Enter, click start point\n2. `@3000<0` + Enter → 3000mm to the right\n3. `@3000<120` + Enter → 3000mm at 120°\n4. `C` + Enter → close\n\n**When to use:**\n• Angled walls or roof lines\n• Non-orthogonal geometry\n• Site plans with property lines at odd angles",
                tip: "If ORTHO (F8) is on, lines are restricted to 0°, 90°, 180°, 270°. Turn ORTHO off (F8) when you need to draw at other angles.",
              },
              {
                title: "Dynamic Input (DYN)",
                content:
                  "**Dynamic Input** shows coordinate boxes right next to your cursor instead of making you look down at the command line.\n\nToggle it with **F12** or the DYN button on the status bar.\n\n**With DYN on:**\n• A small box appears near your cursor showing coordinates\n• When drawing lines, it shows distance and angle\n• Press **Tab** to switch between the distance and angle fields\n• By default, DYN uses **relative** coordinates — you don't need to type @\n\n**Example with DYN on:**\n1. Start LINE, click first point\n2. Move mouse to the right\n3. Type `6000` (this goes in the distance box) → press Tab\n4. Type `0` (this goes in the angle box) → press Enter\n\nDynamic Input is great for beginners because you can see your input at the cursor instead of looking away at the command line.\n\n**Important:** When DYN is on, typed coordinates are relative by default. To use absolute coordinates with DYN on, prefix with `#` (e.g., `#1000,1000`).",
                tip: "Many professionals keep DYN off and just use the command line. Try both ways and see what feels natural to you.",
              },
            ],
            quiz: [
              {
                question: "What does the '@' symbol mean when typing coordinates?",
                options: [
                  "Absolute position from origin",
                  "Relative to the last point entered",
                  "Polar angle reference",
                  "Snap to nearest object",
                ],
                correctIndex: 1,
                explanation:
                  "The @ symbol means 'relative to my last point.' So @3000,0 means '3000 units to the right of where I last clicked.'",
              },
              {
                question: "To draw a line 4000mm straight UP from your current point, what do you type?",
                options: ["@4000,0", "@0,4000", "@4000<90", "Both @0,4000 and @4000<90"],
                correctIndex: 3,
                explanation:
                  "Both work! @0,4000 means 0 in X and 4000 in Y (straight up). @4000<90 means 4000mm at 90 degrees (which is also straight up).",
              },
              {
                question: "You want to draw a line 5000mm to the LEFT. Which is correct?",
                options: ["@5000,0", "@-5000,0", "@5000<0", "@0,-5000"],
                correctIndex: 1,
                explanation:
                  "Left is the negative X direction, so @-5000,0 moves 5000mm left. You could also use @5000<180 (5000mm at 180 degrees).",
              },
              {
                question: "In polar coordinates, what angle is 'straight to the right'?",
                options: ["0°", "90°", "180°", "270°"],
                correctIndex: 0,
                explanation:
                  "In AutoCAD, 0° points East (right), 90° is North (up), 180° is West (left), and 270° is South (down). This is standard math convention.",
              },
            ],
            keyCommands: ["LINE", "ZOOM", "ORTHO", "DYN"],
          },
          {
            id: "fund-1-4",
            title: "Your First Floor Plan",
            duration: "30 min",
            type: "project",
            description: "Draw a simple room outline using LINE, relative coordinates, and OSNAP.",
            steps: [
              {
                title: "Project Brief",
                content:
                  "Let's draw a simple **studio apartment** floor plan. The outer walls form a rectangle 8000mm × 6000mm, with:\n• A bathroom partition (2500mm × 2000mm) in one corner\n• A door opening (900mm) in the bathroom wall\n• A window indication (1200mm) on the long wall\n\nThis project practices: LINE, relative coordinates, OSNAP, and basic navigation.\n\n**Before starting:**\n1. Set units to millimeters (`UNITS` command)\n2. Turn on OSNAP (F3) with Endpoint and Midpoint\n3. Turn on ORTHO (F8) for straight lines",
              },
              {
                title: "Step 1 — Draw the Outer Walls",
                content:
                  "1. Type `L` + Enter to start LINE\n2. Click anywhere in the drawing area (or type `0,0`) for the first point\n3. Type `@8000,0` + Enter → bottom wall going right\n4. Type `@0,6000` + Enter → right wall going up\n5. Type `@-8000,0` + Enter → top wall going left\n6. Type `C` + Enter → close to form the rectangle\n\nYou now have a 8m × 6m rectangle. Use `ZOOM` > `E` (Extents) if you can't see it all.\n\n**Check:** All four corners should be perfectly closed. If OSNAP was on, the C (close) ensures the last line connects exactly to the first point.",
                tip: "You could also use the RECTANGLE command (REC) but learning LINE first teaches you how coordinates work.",
              },
              {
                title: "Step 2 — Draw the Bathroom Partition",
                content:
                  "The bathroom is 2500mm × 2000mm in the bottom-left corner.\n\n1. Type `L` + Enter\n2. Hover over the left wall and snap to a point 2000mm up from the bottom-left corner:\n   - Click the bottom-left corner first: type `L`, click the corner point\n   - Type `@0,2000` + Enter → go up 2000mm\n   - Type `@2500,0` + Enter → go right 2500mm for the partition wall\n   - Press Enter to finish\n\n3. Now draw the other partition wall:\n   - Type `L` + Enter\n   - Snap to the endpoint you just created (at 2500, 2000)\n   - Type `@0,-2000` + Enter → go down to the bottom wall\n   - Press Enter to finish\n\n**Wait — we need a door opening!** The bathroom wall going down should have a 900mm gap for the door. We'll fix this in the next step.",
              },
              {
                title: "Step 3 — Create the Door Opening",
                content:
                  "We need a 900mm opening in the vertical bathroom partition wall. The easiest approach:\n\n**Method 1 — Draw with a gap:**\n1. First, erase the vertical partition wall (type `E` for ERASE, click the line, Enter)\n2. Type `L` + Enter\n3. Snap to where the horizontal partition meets: the point at (2500, 2000)\n4. Type `@0,-1100` + Enter → draw down 1100mm (leaving 900mm gap above the floor)\n5. Press Enter to finish\n\nNow there's a 900mm gap between the bottom of this line and the bottom wall — that's your door opening!\n\n**Alternative — Use BREAK command (more advanced):**\n1. Type `BR` + Enter\n2. Click the vertical partition line\n3. Click first break point (900mm from bottom)\n4. Click second break point (at bottom wall)\n\nBoth methods work. Method 1 is simpler for beginners.",
                tip: "In real architectural drawings, doors are shown with an arc indicating the swing direction. We'll learn that in the next module.",
              },
              {
                title: "Step 4 — Indicate the Window",
                content:
                  "Let's mark a 1200mm window on the right wall (the 6000mm wall), centered vertically.\n\nThe wall is 6000mm tall. A centered 1200mm window starts at 2400mm from the bottom.\n\n1. Type `L` + Enter\n2. Click the bottom-right corner of the outer walls\n3. Type `@0,2400` + Enter → go up to window sill height\n4. Press Enter to finish this reference line\n\n5. Type `L` + Enter\n6. Snap to the endpoint you just made\n7. Type `@-200,0` + Enter → short line inward (wall thickness indication)\n8. Press Enter\n\n9. Repeat at the top of the window:\n   - `L`, snap to bottom-right corner\n   - `@0,3600` + Enter (2400 + 1200 = 3600)\n   - Press Enter\n   - `L`, snap to this point\n   - `@-200,0` + Enter\n   - Press Enter\n\nYou now have two small lines marking the window extent on the wall.\n\nCongratulations — you've drawn your first architectural floor plan! 🎉",
                tip: "Save your work with Ctrl+S. In the next lessons, we'll add proper wall thickness, doors with arcs, and furniture.",
              },
            ],
            keyCommands: ["LINE", "ERASE", "ZOOM", "OSNAP", "ORTHO", "CLOSE"],
            practiceTask:
              "Draw the complete studio apartment: 8000×6000mm outer walls, 2500×2000mm bathroom partition with 900mm door opening, and window marks on the right wall.",
          },
        ],
      },
      {
        id: "fund-m2",
        title: "Essential Drawing Commands",
        description: "Learn the core commands that make up 90% of architectural drafting.",
        lessons: [
          {
            id: "fund-2-1",
            title: "Lines, Circles, and Arcs",
            duration: "20 min",
            type: "theory",
            description: "Master the three fundamental drawing elements.",
            steps: [
              {
                title: "LINE Command (L)",
                content:
                  "You already know LINE. Let's go deeper.\n\n**Starting:** Type `L` + Enter\n**Options during LINE:**\n• Type coordinates to place points precisely\n• Press Enter after each point to continue\n• Type `C` to close back to the first point\n• Type `U` to undo the last segment (without leaving the command)\n• Press Enter or Escape to finish\n\n**Continuing a line:**\nIf you press Enter without selecting a start point, LINE continues from the last endpoint of the previous line. This is handy for extending walls.\n\n**Architecture uses for LINE:**\n• Wall outlines\n• Partition walls\n• Section cut lines\n• Property boundaries\n• Construction/reference lines",
              },
              {
                title: "CIRCLE Command (C)",
                content:
                  "**Starting:** Type `C` + Enter\n**Default mode:** Center point + Radius\n\n**How to draw a circle:**\n1. Type `C` + Enter\n2. Click or type the center point\n3. Type the radius (e.g., `500` for a 500mm radius circle) + Enter\n\n**Other modes** (type the capitalized letter during the command):\n• `D` → Diameter mode (type diameter instead of radius)\n• `3P` → 3-Point circle (specify 3 points on the circumference)\n• `2P` → 2-Point circle (diameter defined by 2 points)\n• `TTR` → Tangent-Tangent-Radius (circle tangent to 2 objects)\n\n**Architecture uses for CIRCLE:**\n• Column sections (round columns)\n• Roundabouts in site plans\n• Door swings (actually arcs, but circles help)\n• Circular windows (rose windows, oculi)\n• Turning radii for vehicle access",
                tip: "To draw a door swing arc, draw a circle with radius = door width, then TRIM it to leave just the 90° arc you need.",
              },
              {
                title: "ARC Command (A)",
                content:
                  "**Starting:** Type `A` + Enter\n**Default mode:** 3-Point Arc (start, second point, end)\n\n**How to draw a 3-point arc:**\n1. Type `A` + Enter\n2. Click the start point\n3. Click a point on the arc (this determines curvature)\n4. Click the end point\n\n**Other modes** (type the option during command):\n• `CE` → Center, Start, End\n• `SE` → Start, End, with sub-options for Angle, Direction, or Radius\n\n**Most useful for architecture — Center, Start, Angle:**\n1. Type `A` + Enter\n2. Type `CE` + Enter (center mode)\n3. Click or type the center point (the door hinge)\n4. Click the start point (closed door position)\n5. Type `A` + Enter (angle mode)\n6. Type `90` + Enter (for a 90° door swing)\n\n**Architecture uses for ARC:**\n• Door swings (90° arcs)\n• Curved walls\n• Staircase handrails\n• Arched windows and doorways",
                tip: "For a standard door swing: the center is the hinge point, the radius equals the door width (typically 800-900mm), and the angle is 90°.",
              },
            ],
            quiz: [
              {
                question: "While in the LINE command, what does typing 'U' do?",
                options: [
                  "Undoes the entire LINE command",
                  "Undoes only the last segment drawn",
                  "Toggles UCS mode",
                  "Closes the shape",
                ],
                correctIndex: 1,
                explanation:
                  "'U' within LINE undoes just the last segment, letting you fix a mistake without starting over. 'C' closes the shape, and Escape exits completely.",
              },
              {
                question: "What CIRCLE mode would you use to draw a column that must touch two walls?",
                options: ["Center + Radius", "3-Point", "2-Point", "Tangent-Tangent-Radius (TTR)"],
                correctIndex: 3,
                explanation:
                  "TTR (Tangent-Tangent-Radius) creates a circle tangent to two objects (the walls) with a specified radius — perfect for fitting a round column between walls.",
              },
            ],
            keyCommands: ["LINE", "CIRCLE", "ARC"],
          },
          {
            id: "fund-2-2",
            title: "Polylines and Rectangles",
            duration: "15 min",
            type: "theory",
            description: "Draw connected shapes and quick rectangles for walls and rooms.",
            steps: [
              {
                title: "POLYLINE Command (PL)",
                content:
                  "A polyline is like LINE, but all segments are **one connected object**. This is important because:\n\n• You can OFFSET a polyline to create wall thickness in one step\n• You can calculate the area inside a closed polyline\n• You can apply HATCH patterns to closed polylines\n• It's easier to select and move as one piece\n\n**Starting:** Type `PL` + Enter\n\n**How to draw:**\n1. Type `PL` + Enter\n2. Click or type the first point\n3. Continue adding points (same as LINE)\n4. Type `C` to close, or Enter to finish\n\n**Special options during PLINE:**\n• `A` → switch to **Arc** mode (draw curved segments)\n• `L` → switch back to **Line** mode\n• `W` → set **Width** (makes thick lines)\n• `H` → set **Halfwidth**\n\n**Example — Room outline with one thick polyline:**\n1. `PL` + Enter\n2. Type `W` → Enter, `200` → Enter, `200` → Enter (200mm wide wall)\n3. Draw your room outline with coordinates\n4. Type `C` to close\n\nNow you have thick walls drawn as a single object!",
                tip: "Always use polylines (PL) instead of individual lines (L) for wall outlines. It makes editing, offsetting, and hatching much easier.",
              },
              {
                title: "RECTANGLE Command (REC)",
                content:
                  "**Starting:** Type `REC` + Enter\n\n**Default mode:** Two opposite corners\n1. Type `REC` + Enter\n2. Click first corner\n3. Click opposite corner (or type `@width,height`)\n\n**Example — 6000×4000mm room:**\n1. `REC` + Enter\n2. Click a point\n3. Type `@6000,4000` + Enter\n\n**Options:**\n• `D` → Dimensions mode: type width, then height\n• `C` → Chamfer: specify chamfer distance for corners\n• `F` → Fillet: specify radius for rounded corners\n• `W` → Width: line thickness\n\n**Important:** A rectangle is actually a **closed polyline**. So you can:\n• OFFSET it to create wall thickness\n• EXPLODE it into individual lines\n• HATCH its interior\n\n**Architecture uses:**\n• Quick room outlines\n• Column sections (rectangular)\n• Furniture (desks, beds)\n• Window openings in elevation",
                tip: "For rooms, draw a rectangle then OFFSET it inward by wall thickness (typically 100-200mm) to get double-line walls.",
              },
            ],
            keyCommands: ["PLINE", "RECTANGLE", "OFFSET", "EXPLODE"],
            practiceTask:
              "Draw a 10000×8000mm floor plan outline using POLYLINE with 200mm width. Then draw a 3000×3500mm room inside using RECTANGLE.",
          },
          {
            id: "fund-2-3",
            title: "Drawing Commands Quiz",
            duration: "10 min",
            type: "quiz",
            description: "Test your knowledge of all drawing commands learned so far.",
            steps: [
              {
                title: "Quiz Instructions",
                content: "Answer all questions to test your understanding of LINE, CIRCLE, ARC, POLYLINE, and RECTANGLE commands. You need 70% to pass.",
              },
            ],
            quiz: [
              {
                question: "What is the main advantage of POLYLINE over LINE?",
                options: [
                  "Polylines can be curved",
                  "All segments are one connected object",
                  "Polylines are faster to draw",
                  "Polylines can only be horizontal or vertical",
                ],
                correctIndex: 1,
                explanation:
                  "Polyline segments form a single connected object, making it easy to offset, hatch, calculate area, and select/move the entire shape at once.",
              },
              {
                question: "A RECTANGLE in AutoCAD is actually a:",
                options: ["Group of 4 lines", "Closed polyline", "Region", "Block"],
                correctIndex: 1,
                explanation:
                  "AutoCAD's RECTANGLE command creates a closed polyline, which means you can offset it, hatch it, and treat it as one object.",
              },
              {
                question: "To draw a door swing arc, which ARC input method is most practical?",
                options: [
                  "3-Point Arc",
                  "Start, End, Radius",
                  "Center, Start, Angle",
                  "Start, End, Direction",
                ],
                correctIndex: 2,
                explanation:
                  "Center (hinge point), Start (door edge), Angle (90°) is the most intuitive way to draw a door swing arc in a floor plan.",
              },
              {
                question: "How do you make a polyline draw with visible wall thickness?",
                options: [
                  "Change the lineweight in layer properties",
                  "Use the Width (W) option during the PLINE command",
                  "Use the PEDIT command after drawing",
                  "Both B and C work",
                ],
                correctIndex: 3,
                explanation:
                  "You can set width during the PLINE command with the W option, or change it afterward with PEDIT. Both create visually thick lines.",
              },
              {
                question: "You need to draw a circle that fits exactly between two parallel walls. What mode?",
                options: ["Center + Radius", "2-Point", "TTR (Tangent-Tangent-Radius)", "3-Point"],
                correctIndex: 2,
                explanation:
                  "TTR creates a circle tangent to two objects. Select both walls, enter the radius, and AutoCAD places the circle perfectly between them.",
              },
            ],
          },
        ],
      },
      {
        id: "fund-m3",
        title: "Editing & Modifying Objects",
        description: "Learn to move, copy, rotate, trim, and transform your drawings.",
        lessons: [
          {
            id: "fund-3-1",
            title: "Move, Copy, and Rotate",
            duration: "18 min",
            type: "theory",
            description: "Reposition and duplicate objects with precision.",
            steps: [
              {
                title: "MOVE Command (M)",
                content:
                  "**Starting:** Type `M` + Enter\n\n**Steps:**\n1. Select objects to move (click them, or use a selection window)\n2. Press Enter to confirm selection\n3. Click a **base point** (the 'handle' you'll move from)\n4. Click the **destination point** (where the handle goes to)\n\n**Using coordinates:**\n1. `M` + Enter\n2. Select objects + Enter\n3. Click base point (e.g., corner of a room)\n4. Type `@3000,0` + Enter → moves 3000mm to the right\n\n**Selection methods:**\n• **Click** individual objects\n• **Window** (click left→right): selects objects fully INSIDE the box\n• **Crossing** (click right→left): selects objects that TOUCH the box\n• Type `ALL` to select everything\n\n**Architecture example:**\nMove a bathroom partition: select the walls, pick a corner as base point, type the new position.",
                tip: "The base point doesn't have to be ON the object. Pick a point that makes the math easy — like a corner you want to align to a grid.",
              },
              {
                title: "COPY Command (CO)",
                content:
                  "**Starting:** Type `CO` + Enter\n\nCOPY works exactly like MOVE, but leaves the original in place.\n\n**Steps:**\n1. Select objects + Enter\n2. Click base point\n3. Click destination (or type coordinates)\n4. **Keep clicking** to place more copies!\n5. Press Enter or Escape to finish\n\n**Architecture examples:**\n• Copy a window along a wall: select window, base point at one end, type `@2000,0` to place the next one 2000mm over\n• Copy a column: select column, copy to grid intersections\n• Copy a furniture set: select all pieces, copy to another room\n\n**Pro shortcut:**\nAfter making one copy, you can keep clicking to place more copies at different locations without restarting the command.",
                tip: "COPY is your best friend for repetitive elements: windows, columns, parking spaces, trees in a site plan, furniture, etc.",
              },
              {
                title: "ROTATE Command (RO)",
                content:
                  "**Starting:** Type `RO` + Enter\n\n**Steps:**\n1. Select objects + Enter\n2. Click the **center of rotation** (the pivot point)\n3. Type the rotation angle + Enter\n\n**Important:** Positive angles rotate **counter-clockwise** (CCW).\n• 90 → quarter turn CCW\n• -90 → quarter turn clockwise\n• 45 → 45° CCW\n\n**Reference option (R):**\nWhen you need to rotate to match an angle you don't know:\n1. `RO` + Enter, select objects + Enter\n2. Pick rotation center\n3. Type `R` + Enter (reference mode)\n4. Click two points showing the current angle\n5. Type the desired angle\n\n**Architecture example:**\nRotate a building to match a site boundary angle:\n1. Select the building\n2. Pick a corner as the rotation center\n3. Use Reference: click along the current orientation, then type the site angle",
                tip: "For furniture layout: draw one chair, COPY and ROTATE it around a table. Use the center of the table as the rotation point.",
              },
            ],
            quiz: [
              {
                question: "What is the difference between a 'Window' and 'Crossing' selection?",
                options: [
                  "Window is for rectangles, Crossing is for circles",
                  "Window selects objects fully inside the box; Crossing selects objects touching the box",
                  "Window works left-to-right; Crossing works top-to-bottom",
                  "There is no difference",
                ],
                correctIndex: 1,
                explanation:
                  "Window (left→right) selects only objects COMPLETELY inside the box. Crossing (right→left) selects anything that TOUCHES the box. Crossing shows as a dashed-line box.",
              },
            ],
            keyCommands: ["MOVE", "COPY", "ROTATE"],
            practiceTask: "Draw a 600mm diameter circle (a column). Copy it 4 times at 3000mm intervals along a grid line. Then rotate one copy 45 degrees.",
          },
          {
            id: "fund-3-2",
            title: "Trim, Extend, and Offset",
            duration: "20 min",
            type: "interactive",
            description: "Clean up intersections and create parallel elements — the most-used editing tools in architecture.",
            steps: [
              {
                title: "TRIM Command (TR)",
                content:
                  "**Starting:** Type `TR` + Enter\n\nTRIM cuts away parts of objects at intersection points. It's like using scissors.\n\n**Modern method (AutoCAD 2021+):**\n1. Type `TR` + Enter\n2. Press Enter again (selects ALL objects as cutting edges)\n3. Click the parts you want to remove\n4. Press Enter to finish\n\n**Classic method:**\n1. Type `TR` + Enter\n2. Select the cutting edges (the 'blades') + Enter\n3. Click the parts to remove\n\n**Architecture uses:**\n• Clean up wall intersections (where walls meet, trim the overlapping parts)\n• Create door openings (draw a line across a wall, use it to trim the wall)\n• Clean up window details\n• Remove excess lines from hatching boundaries\n\n**Important:** TRIM only works where objects intersect. If objects don't cross, nothing will be trimmed.",
                tip: "Hold Shift while in TRIM to temporarily switch to EXTEND mode. This is the fastest way to work — trim and extend without switching commands.",
              },
              {
                title: "EXTEND Command (EX)",
                content:
                  "**Starting:** Type `EX` + Enter\n\nEXTEND lengthens objects to meet a boundary edge. It's the opposite of TRIM.\n\n**Modern method:**\n1. Type `EX` + Enter\n2. Press Enter (all objects become potential boundaries)\n3. Click the end of the object you want to extend\n4. It stretches to meet the nearest boundary\n\n**Architecture example:**\nYou drew interior walls that don't quite reach the exterior wall:\n1. `EX` + Enter + Enter (select all boundaries)\n2. Click the short end of each interior wall\n3. They extend to meet the exterior wall\n\n**Tip within TRIM:**\nWhile using TRIM, hold Shift and click an object to EXTEND it instead. This combo is extremely fast for cleaning up drawings.",
                tip: "If EXTEND lengthens a line to the wrong boundary, UNDO (Ctrl+Z) and select only the boundary you want before extending.",
              },
              {
                title: "OFFSET Command (O)",
                content:
                  "**Starting:** Type `O` + Enter\n\nOFFSET creates a parallel copy of an object at a specified distance. **This is the #1 command for creating walls.**\n\n**Steps:**\n1. Type `O` + Enter\n2. Type the offset distance (e.g., `200` for 200mm wall thickness) + Enter\n3. Click the object to offset\n4. Click which **side** you want the copy on\n5. Keep clicking objects and sides for more offsets\n6. Press Enter to finish\n\n**Architecture uses (this is huge):**\n• **Double-line walls:** Draw one line, OFFSET by wall thickness (200mm)\n• **Setback lines:** OFFSET property boundary by setback distance\n• **Parallel walls:** OFFSET a wall to create the next room\n• **Contour lines:** OFFSET one contour to create the next elevation\n• **Road edges:** OFFSET centerline by half the road width\n\n**Example — Creating double-line walls:**\n1. Draw the outer wall line with LINE or POLYLINE\n2. `O` + Enter\n3. Type `200` + Enter (200mm wall)\n4. Click the wall line\n5. Click inside (toward room interior)\n6. You now have a double-line wall!",
                tip: "OFFSET is so important that some architects put it on a keyboard shortcut they can reach without looking. It's the foundation of wall drawing.",
              },
            ],
            quiz: [
              {
                question: "What is the fastest way to create double-line walls from a single line?",
                options: [
                  "Draw two parallel lines manually",
                  "Use OFFSET to create a parallel copy at wall thickness distance",
                  "Use COPY and MOVE",
                  "Use MIRROR",
                ],
                correctIndex: 1,
                explanation:
                  "OFFSET creates a perfectly parallel copy at your specified distance (wall thickness). It's much faster and more accurate than drawing two lines manually.",
              },
            ],
            keyCommands: ["TRIM", "EXTEND", "OFFSET"],
            practiceTask: "Draw an L-shaped room outline with single lines. Then OFFSET all lines inward by 200mm to create wall thickness. Use TRIM to clean up the corners where the offset lines intersect.",
          },
        ],
      },
    ],
  },
  {
    id: "architectural-drafting",
    title: "Architectural Drafting",
    subtitle: "Professional Drawings",
    description:
      "Learn to create production-quality architectural drawings. Master layers, dimensions, hatching, text, and annotation techniques used in professional practice.",
    icon: "PenTool",
    color: "#BF5AF2",
    level: "Intermediate",
    duration: "18 hours",
    tags: ["Layers", "Dimensions", "Annotation"],
    modules: [
      {
        id: "arch-m1",
        title: "Layer Management",
        description: "Organize your drawings like a professional with proper layering.",
        lessons: [
          {
            id: "arch-1-1",
            title: "Understanding Layers",
            duration: "18 min",
            type: "theory",
            description: "Learn how layers organize architectural drawings and why they're essential.",
            steps: [
              {
                title: "What Are Layers?",
                content:
                  "Think of layers as transparent sheets stacked on top of each other. Each sheet holds a different type of information:\n\n• **Walls** layer → all wall lines\n• **Doors** layer → all door symbols\n• **Windows** layer → all window symbols\n• **Furniture** layer → all furniture\n• **Dimensions** layer → all dimensions\n• **Text** layer → all annotations\n\n**Why layers matter:**\n1. **Visibility:** Turn layers on/off to reduce clutter. Working on electrical? Hide furniture.\n2. **Color coding:** Each layer has a color, making drawings readable\n3. **Lineweight:** Walls are thick, furniture is thin. Layers control this.\n4. **Plotting:** Control which layers print and how they appear\n5. **Organization:** Other people can understand your drawing\n\n**Opening Layer Manager:**\nType `LA` + Enter, or click the Layers panel on the Home tab.",
              },
              {
                title: "Creating Layers",
                content:
                  "**Steps to create layers:**\n1. Type `LA` + Enter (opens Layer Properties Manager)\n2. Click the 'New Layer' button (or Alt+N)\n3. Type the layer name\n4. Set color (click the color swatch)\n5. Set lineweight (click the lineweight value)\n6. Click OK\n\n**Recommended starter layers for architecture:**\n\n| Layer Name | Color | Lineweight | Purpose |\n|-----------|-------|------------|----------|\n| A-WALL | White (7) | 0.50mm | Walls (cut in plan) |\n| A-WALL-PRTN | Cyan (4) | 0.35mm | Partition walls |\n| A-DOOR | Red (1) | 0.25mm | Doors and swings |\n| A-WINDOW | Yellow (2) | 0.25mm | Windows |\n| A-FURNITURE | Magenta (6) | 0.13mm | Furniture |\n| A-DIMS | Green (3) | 0.13mm | Dimensions |\n| A-TEXT | Green (3) | 0.13mm | Text annotations |\n| A-HATCH | 8 (grey) | 0.09mm | Hatching/fills |\n| A-GRID | 9 (light grey) | 0.09mm | Column grid |\n\nThe 'A-' prefix stands for 'Architectural.' This follows the AIA (American Institute of Architects) layer standard.",
                tip: "Color 7 (white/black) has special behavior: it appears white on a black background and black on a white background. It's ideal for walls that need to print bold.",
              },
              {
                title: "Working with Layers",
                content:
                  "**Setting the current layer:**\n• In the Layers dropdown (Home tab), select the layer you want to draw on\n• Everything you draw goes on the CURRENT layer\n• Before drawing walls, select A-WALL. Before placing doors, switch to A-DOOR.\n\n**Moving objects between layers:**\n1. Select the objects\n2. In the Layers dropdown, click the destination layer\n3. The objects move to that layer\n\n**Layer controls:**\n• **On/Off** (lightbulb icon): Hides objects but they're still processed\n• **Freeze/Thaw** (sun/snowflake): Hides AND skips processing (faster for big drawings)\n• **Lock/Unlock** (padlock): Objects visible but can't be selected or edited\n\n**Best practice workflow:**\n1. Create all layers before you start drawing\n2. Always check you're on the right layer before drawing\n3. If something ends up on the wrong layer, select it and change the layer in the dropdown\n4. Lock layers you're not working on to avoid accidental edits",
                tip: "If you accidentally draw on the wrong layer, select the objects, then change their layer using the layer dropdown in the Properties panel. No need to redraw!",
              },
            ],
            quiz: [
              {
                question: "Why should walls and furniture be on different layers?",
                options: [
                  "AutoCAD requires it for the PLOT command",
                  "So you can control visibility, color, and lineweight independently",
                  "Layers make the file size smaller",
                  "It's optional and doesn't matter",
                ],
                correctIndex: 1,
                explanation:
                  "Separate layers let you: turn furniture off while editing walls, print walls with thick lines and furniture with thin lines, and apply different colors for readability.",
              },
              {
                question: "What does 'freezing' a layer do compared to turning it off?",
                options: [
                  "Same thing — both just hide the layer",
                  "Freezing also prevents AutoCAD from processing the layer, improving performance",
                  "Freezing deletes the layer",
                  "Freezing locks the layer from editing",
                ],
                correctIndex: 1,
                explanation:
                  "Freezing hides the layer AND tells AutoCAD to skip it during regeneration/processing. For large drawings with many layers, freezing unused layers improves speed.",
              },
            ],
            keyCommands: ["LAYER", "LAYON", "LAYOFF", "LAYFRZ", "LAYTHW", "LAYLCK"],
          },
        ],
      },
      {
        id: "arch-m2",
        title: "Dimensioning & Annotation",
        description: "Add precise measurements and professional annotations.",
        lessons: [
          {
            id: "arch-2-1",
            title: "Linear and Aligned Dimensions",
            duration: "20 min",
            type: "theory",
            description: "Add professional dimensions to your floor plans.",
            steps: [
              {
                title: "Linear Dimensions (DLI)",
                content:
                  "**Starting:** Type `DLI` + Enter\n\nLinear dimensions measure horizontal or vertical distances.\n\n**Steps:**\n1. Type `DLI` + Enter\n2. Click the **first extension line origin** (e.g., left wall corner)\n3. Click the **second extension line origin** (e.g., right wall corner)\n4. Move mouse to position the dimension line, then click\n\nThe dimension text automatically shows the measured distance.\n\n**Architecture rules for dimensioning:**\n• Place dimension lines outside the floor plan\n• First row: individual room dimensions\n• Second row: overall dimensions (wall-to-wall)\n• Third row: grid or structural dimensions\n• Dimension lines should be spaced 10mm apart (at plot scale)\n• Never dimension to a line in the middle of a wall — always to wall faces",
                tip: "Use OSNAP (Endpoint) to snap precisely to wall corners when placing dimension points. Inaccurate dimension points = wrong measurements.",
              },
              {
                title: "Aligned Dimensions (DAL)",
                content:
                  "**Starting:** Type `DAL` + Enter\n\nAligned dimensions measure the true distance along angled objects.\n\n**When to use:**\n• Angled walls\n• Roof slopes\n• Property lines that aren't orthogonal\n• Staircase stringers\n\n**Steps:** Same as linear — pick two points, position the dimension.\n\nThe difference: DLI gives horizontal or vertical distance only. DAL gives the actual distance along the angle.\n\n**Example:**\nA wall runs at 30° and is 5000mm long:\n• DLI would show the horizontal projection (4330mm)\n• DAL would correctly show 5000mm",
              },
              {
                title: "Continuous and Baseline Dimensions",
                content:
                  "**DIMCONTINUE (DCO):**\nAfter placing one dimension, type `DCO` + Enter to continue dimensioning from the last point. Each new click adds another dimension in the chain.\n\nPerfect for dimensioning room widths along a wall:\n`DLI` → first room width → `DCO` → next room → next room → Enter\n\n**DIMBASELINE (DBA):**\nAll dimensions measure from the same baseline (first point).\n\n`DLI` → first dimension → `DBA` → cumulative dimensions from same origin\n\n**Architecture convention:**\n• Use **continuous** for individual room dimensions (each room width)\n• Use **baseline** for overall/cumulative dimensions\n• Place continuous closer to the plan, baseline farther away",
                tip: "Professional drawings have 3 rows of dimensions: individual rooms (closest), section totals (middle), and overall building dimensions (farthest).",
              },
            ],
            keyCommands: ["DIMLINEAR", "DIMALIGNED", "DIMCONTINUE", "DIMBASELINE"],
            practiceTask: "Dimension a 3-room floor plan with continuous dimensions for individual rooms and baseline dimensions for the overall building width.",
          },
        ],
      },
      {
        id: "arch-m3",
        title: "Hatching & Fill Patterns",
        description: "Add material representations and section fills to your drawings.",
        lessons: [
          {
            id: "arch-3-1",
            title: "Hatching Basics",
            duration: "18 min",
            type: "theory",
            description: "Learn to apply hatch patterns for materials and section cuts.",
            steps: [
              {
                title: "What is Hatching?",
                content:
                  "**Hatching** fills enclosed areas with patterns that represent materials in architectural drawings.\n\n**Common architectural hatch patterns:**\n• **ANSI31** — diagonal lines (general section cut, steel)\n• **AR-CONC** — concrete (random dots and stones)\n• **AR-SAND** — sand/earth (dot pattern)\n• **AR-BRSTD** — brick (standard running bond)\n• **AR-HBONE** — herringbone (pavers, tiles)\n• **SOLID** — solid fill (used for section cuts, sometimes walls)\n• **EARTH** — earth/ground in sections\n\n**When to use hatching:**\n• Floor plans: fill wall sections that are cut through\n• Sections: show materials (concrete, brick, insulation, earth)\n• Site plans: grass, paving, water\n• Elevations: material indications",
              },
              {
                title: "Using the HATCH Command",
                content:
                  "**Starting:** Type `H` + Enter (opens Hatch Creation ribbon tab)\n\n**Steps:**\n1. Type `H` + Enter\n2. The Hatch Creation tab appears on the ribbon\n3. Choose a **Pattern** (click the pattern dropdown)\n4. Set the **Scale** (controls pattern density)\n5. Click **inside the enclosed area** you want to fill\n6. Press Enter to confirm\n\n**Important settings:**\n• **Scale:** Too small = solid black mess. Too large = invisible pattern. For 1:100 plans, try scale 25-50 for AR- patterns.\n• **Angle:** Rotate the pattern (0 = default orientation)\n• **Associative:** When ON (default), hatch updates if the boundary changes\n\n**Boundary tips:**\n• The area MUST be fully enclosed — no gaps!\n• If hatch fails, zoom in and look for tiny gaps between lines\n• Use `ZOOM` + `E` to verify the boundary is closed\n• HATCH uses the nearest enclosed boundary from where you click",
                tip: "If your hatch looks solid black, the scale is too small. Try increasing it by 10x. For AR-CONC in a 1:100 plan, try scale 50.",
              },
            ],
            quiz: [
              {
                question: "Your hatch pattern appears as a solid black fill. What's the most likely problem?",
                options: ["Wrong pattern selected", "Hatch scale is too small", "The boundary isn't closed", "The layer is wrong"],
                correctIndex: 1,
                explanation: "When the hatch scale is too small, the pattern lines are so close together they appear solid. Increase the scale value.",
              },
            ],
            keyCommands: ["HATCH", "HATCHEDIT", "SOLID"],
            practiceTask: "Draw a wall section and apply AR-CONC to the concrete, AR-BRSTD to the brick veneer, and ANSI31 to the steel beam.",
          },
        ],
      },
      {
        id: "arch-m4",
        title: "Text & Leaders",
        description: "Add professional annotations, labels, and notes.",
        lessons: [
          {
            id: "arch-4-1",
            title: "Adding Text and Room Labels",
            duration: "15 min",
            type: "theory",
            description: "Label rooms, add notes, and create professional text styles.",
            steps: [
              {
                title: "MTEXT — Multiline Text",
                content:
                  "**Starting:** Type `MT` + Enter\n\n**Steps:**\n1. Type `MT` + Enter\n2. Click to set the first corner of the text box\n3. Click to set the opposite corner (defines text width)\n4. Type your text in the editor\n5. Click outside or press Ctrl+Enter to finish\n\n**The MTEXT Editor:**\n• Works like a mini word processor\n• Set font, size, bold, italic, underline\n• Use the **Height** setting to control text size\n• For 1:100 plans, text height of 200-250 works well (prints at 2-2.5mm)\n\n**Common text uses in architecture:**\n• Room labels: \"LIVING ROOM\", \"BEDROOM 1\", etc.\n• Area labels: \"15.5 m²\"\n• General notes: construction specifications\n• Title block information",
                tip: "Create a Text Style (type STYLE) with your preferred font and height. Use Arial or Simplex for clean architectural text. Set it once and reuse it everywhere.",
              },
              {
                title: "Leaders and Callouts (MLEADER)",
                content:
                  "**Starting:** Type `MLD` + Enter\n\nLeaders are arrows pointing to something with a text note attached.\n\n**Steps:**\n1. Type `MLD` + Enter\n2. Click the **arrowhead point** (what you're pointing at)\n3. Click where the **leader landing** should be\n4. Type your note text\n5. Click outside to finish\n\n**Architecture uses:**\n• Material callouts: \"12mm PLASTERBOARD\"\n• Detail references: \"SEE DETAIL A/3\"\n• Section marks\n• Revision notes\n• Specification tags\n\n**Leader Styles:**\nType `MLEADERSTYLE` to create different leader appearances:\n• Arrow type (filled, open, dot)\n• Text attachment (above, inline)\n• Landing length",
                tip: "Create separate MLEADER styles for different annotation types — one for material callouts, one for detail references, one for revision clouds.",
              },
            ],
            keyCommands: ["MTEXT", "MLEADER", "STYLE", "MLEADERSTYLE"],
            practiceTask: "Label all rooms in a floor plan with room names and areas. Add material callout leaders to wall sections.",
          },
        ],
      },
    ],
  },
  {
    id: "3d-modeling",
    title: "3D Modeling for Architects",
    subtitle: "Bring Designs to Life",
    description:
      "Transition from 2D to 3D. Create solid models, understand 3D navigation, and build massing studies.",
    icon: "Box",
    color: "#32D7FF",
    level: "Advanced",
    duration: "24 hours",
    tags: ["3D Solids", "Extrude", "Navigation"],
    modules: [
      {
        id: "3d-m1",
        title: "Introduction to 3D Space",
        description: "Navigate and understand AutoCAD's 3D environment.",
        lessons: [
          {
            id: "3d-1-1",
            title: "3D Navigation and ViewCube",
            duration: "15 min",
            type: "theory",
            description: "Learn to navigate 3D space confidently.",
            steps: [
              {
                title: "The ViewCube",
                content:
                  "The **ViewCube** is the 3D navigation cube in the top-right corner of your drawing area.\n\n**How to use it:**\n• Click **TOP** → plan view (looking down)\n• Click **FRONT** → front elevation\n• Click **RIGHT** → right side elevation\n• Click corners → isometric views\n• Click edges → intermediate views\n• Drag the cube → free orbit\n\n**Keyboard shortcuts for views:**\n• `PLAN` + Enter → top-down plan view\n• `-VP` + Enter → set specific viewpoints\n\n**Navigation controls:**\n• **Scroll wheel**: zoom in/out\n• **Middle-click drag**: pan\n• **Shift + middle-click drag**: orbit (rotate view)\n• `ORBIT` command: free 3D rotation\n\n**Visual Styles:**\nChange how your 3D model looks:\n• **2D Wireframe**: standard drafting view\n• **Realistic**: shows materials and lighting\n• **Conceptual**: colored faces, good for massing studies\n• **Shaded**: solid colors without materials",
                tip: "Press Shift + scroll wheel button and drag to orbit. This is the fastest way to look around your 3D model.",
              },
              {
                title: "Extrude — 2D to 3D",
                content:
                  "The **EXTRUDE** command transforms 2D shapes into 3D solids.\n\n**Steps:**\n1. Draw a closed 2D shape (rectangle, circle, closed polyline)\n2. Type `EXT` + Enter\n3. Select the 2D shape + Enter\n4. Type the height (e.g., `3000` for a 3m wall) + Enter\n\n**Architecture example — Walls from floor plan:**\n1. Draw your floor plan in 2D with closed polylines for each wall segment\n2. Select all wall polylines\n3. `EXT` + Enter\n4. Type `2700` (standard wall height) + Enter\n5. Switch to isometric view to see your 3D walls!\n\n**Options:**\n• Type a positive number to extrude UP\n• Type a negative number to extrude DOWN\n• `T` → Taper angle (creates tapered/angled extrusion)\n• `P` → extrude along a Path\n\nThis is the simplest and most common way architects create 3D models in AutoCAD.",
                tip: "Your 2D shape MUST be closed (a closed polyline, rectangle, or circle) for EXTRUDE to work. If you drew with individual lines, use JOIN (J) or PEDIT to convert to a polyline first.",
              },
            ],
            keyCommands: ["ORBIT", "EXTRUDE", "PLAN", "VSCURRENT"],
            practiceTask: "Draw a simple rectangular floor plan with walls as closed polylines, then EXTRUDE them to 2700mm height. Switch to an isometric view to see the result.",
          },
        ],
      },
      {
        id: "3d-m2",
        title: "Boolean Operations & Solid Editing",
        description: "Combine and modify 3D solids to create complex architectural forms.",
        lessons: [
          {
            id: "3d-2-1",
            title: "Union, Subtract, and Intersect",
            duration: "20 min",
            type: "theory",
            description: "Master the three Boolean operations for combining 3D solids.",
            steps: [
              {
                title: "UNION — Joining Solids",
                content:
                  "**Starting:** Type `UNION` + Enter\n\n**What it does:** Combines two or more solids into one single solid.\n\n**Steps:**\n1. Create two overlapping or touching 3D solids\n2. Type `UNION` + Enter\n3. Select all solids you want to combine + Enter\n4. They merge into one object\n\n**Architecture example:**\nYou extruded each wall separately. UNION them all into one solid building mass:\n1. Select all wall extrusions\n2. `UNION` + Enter\n3. Now all walls are one connected solid — you can apply materials as one piece",
              },
              {
                title: "SUBTRACT — Cutting Holes",
                content:
                  "**Starting:** Type `SUBTRACT` + Enter\n\n**What it does:** Cuts one solid away from another. This is how you create **door and window openings** in 3D.\n\n**Steps:**\n1. Type `SUBTRACT` + Enter\n2. Select the solid to **keep** (the wall) + Enter\n3. Select the solid to **cut away** (the box for the opening) + Enter\n4. The cutting solid is removed, leaving a hole\n\n**Architecture example — Window opening:**\n1. Create a box where the window will be (same width/height as window, thick enough to cut through the wall)\n2. Position it overlapping the wall\n3. `SUBTRACT` → select wall → Enter → select box → Enter\n4. You now have a window opening in your 3D wall!\n\nThis is the most important Boolean operation for architecture.",
                tip: "Create the cutting box slightly larger than the opening you need. Position it with MOVE, using OSNAP for precision.",
              },
              {
                title: "INTERSECT — Common Volume",
                content:
                  "**Starting:** Type `INTERSECT` + Enter\n\n**What it does:** Keeps only the volume where two solids overlap.\n\n**Steps:**\n1. Type `INTERSECT` + Enter\n2. Select both solids + Enter\n3. Only the overlapping portion remains\n\n**Architecture uses:**\n• Finding the common volume of two intersecting forms\n• Creating complex shapes from simple overlapping primitives\n• Roof intersections — where two pitched roofs meet\n\n**Less common** than UNION and SUBTRACT in architecture, but powerful for complex geometric forms.",
              },
            ],
            quiz: [
              {
                question: "You need to create a window opening in a 3D wall. Which Boolean operation do you use?",
                options: ["UNION", "SUBTRACT", "INTERSECT", "EXTRUDE"],
                correctIndex: 1,
                explanation: "SUBTRACT removes one solid from another. Create a box where the window goes, then SUBTRACT it from the wall to leave an opening.",
              },
            ],
            keyCommands: ["UNION", "SUBTRACT", "INTERSECT", "BOX"],
            practiceTask: "Create a 3D room with extruded walls, then use SUBTRACT with boxes to cut a door opening (900×2100mm) and two window openings (1200×1500mm, sill at 900mm).",
          },
        ],
      },
    ],
  },
  {
    id: "blocks-references",
    title: "Blocks & References",
    subtitle: "Reusable Components",
    description:
      "Create intelligent, reusable drawing components. Build block libraries for doors, windows, furniture, and learn to use external references for team collaboration.",
    icon: "Cpu",
    color: "#FF2D55",
    level: "Intermediate",
    duration: "14 hours",
    tags: ["Blocks", "Xrefs", "Libraries"],
    modules: [
      {
        id: "blk-m1",
        title: "Creating & Using Blocks",
        description: "Build reusable components that save hours of repetitive work.",
        lessons: [
          {
            id: "blk-1-1",
            title: "Block Fundamentals",
            duration: "20 min",
            type: "theory",
            description: "Learn to create, insert, and manage blocks for architectural elements.",
            steps: [
              {
                title: "What Are Blocks?",
                content:
                  "A **block** is a group of objects saved as a single, reusable component.\n\n**Why blocks matter in architecture:**\n• Draw a door symbol once, reuse it 50 times\n• Change the block definition → ALL instances update\n• Blocks keep file sizes small (stored once, referenced many times)\n• Blocks can carry data (room numbers, door types, etc.)\n\n**Common architectural blocks:**\n• Doors (single, double, sliding, bi-fold)\n• Windows (casement, sliding, fixed)\n• Furniture (desks, chairs, beds, sofas)\n• Plumbing fixtures (toilets, sinks, bathtubs)\n• Electrical symbols (outlets, switches, lights)\n• Trees and landscaping\n• Title block and north arrow",
              },
              {
                title: "Creating a Block (BLOCK command)",
                content:
                  "**Starting:** Type `B` + Enter (or `BLOCK`)\n\n**Steps:**\n1. First, draw the objects that make up your block (e.g., a door: a line + an arc)\n2. Type `B` + Enter\n3. **Name:** Give it a clear name (e.g., 'DOOR-900-SGL')\n4. **Base point:** Click the insertion point (for a door, pick the hinge point)\n5. **Select objects:** Select all objects that form the block + Enter\n6. Choose **Convert to block** (keeps the objects as a block in your drawing)\n7. Click OK\n\n**Naming convention:**\n`TYPE-SIZE-VARIANT`\n• DOOR-900-SGL (900mm single door)\n• DOOR-1800-DBL (1800mm double door)\n• WIN-1200-CSMT (1200mm casement window)\n• FURN-DESK-1500 (1500mm desk)\n\n**The base point is crucial.** It's the 'handle' used when inserting. For doors: use the hinge point. For windows: use the center-bottom. For furniture: use a corner.",
                tip: "Always draw blocks at real size (1:1). AutoCAD will scale them on insertion if needed. This keeps everything consistent.",
              },
              {
                title: "Inserting Blocks (INSERT command)",
                content:
                  "**Starting:** Type `I` + Enter (or `INSERT`)\n\n**Steps:**\n1. Type `I` + Enter\n2. Select the block name from the dropdown\n3. Click the insertion point in your drawing\n4. Set rotation angle (or type it: 0, 90, 180, 270)\n5. Press Enter\n\n**Options during insertion:**\n• **Scale:** Usually leave at 1 (if you drew at real size)\n• **Rotation:** Type angle or click to specify direction\n• **Explode:** Check this to insert as individual objects (not as a block) — usually leave unchecked\n\n**Inserting from external files:**\nIn the INSERT dialog, click **Browse** to insert a .dwg file as a block. This lets you build a library of blocks as separate files.\n\n**Architecture workflow:**\n1. Create all your standard blocks in a template file\n2. Start each new project from this template\n3. All blocks are ready to insert immediately",
                tip: "Create a folder called 'Block Library' with subfolders: Doors, Windows, Furniture, Electrical, Plumbing. Save each block as a separate .dwg file.",
              },
            ],
            quiz: [
              {
                question: "Why is the base point important when creating a block?",
                options: [
                  "It determines the block's color",
                  "It's the handle/anchor used for positioning when inserting the block",
                  "It defines which layer the block goes on",
                  "It sets the block's scale",
                ],
                correctIndex: 1,
                explanation: "The base point is the insertion handle. For a door block, you'd set it at the hinge so you can place the door precisely at the wall opening.",
              },
            ],
            keyCommands: ["BLOCK", "INSERT", "WBLOCK", "BEDIT"],
            practiceTask: "Create a single door block (900mm wide with 90° swing arc, hinge as base point). Insert it at 3 different locations in a floor plan with different rotations.",
          },
        ],
      },
    ],
  },
  {
    id: "plotting-output",
    title: "Plotting & Output",
    subtitle: "Print-Ready Drawings",
    description:
      "Master the art of producing professional printed drawings. Learn layouts, viewports, title blocks, scale management, and PDF output.",
    icon: "FileOutput",
    color: "#FF9F0A",
    level: "Intermediate",
    duration: "10 hours",
    tags: ["Plotting", "Layouts", "PDF"],
    modules: [
      {
        id: "plot-m1",
        title: "Layouts & Viewports",
        description: "Set up print-ready drawing sheets with properly scaled views.",
        lessons: [
          {
            id: "plot-1-1",
            title: "Understanding Paper Space",
            duration: "20 min",
            type: "theory",
            description: "Learn the difference between Model Space and Paper Space for professional output.",
            steps: [
              {
                title: "Model Space vs Paper Space",
                content:
                  "**Model Space** (the Model tab):\n• Your infinite drawing canvas\n• Draw at 1:1 real-world scale\n• A 10m wall = 10,000 units\n• This is where you CREATE your design\n\n**Paper Space** (Layout tabs):\n• Represents the actual printed sheet\n• Has a fixed size (A3, A1, etc.)\n• Contains **viewports** — windows looking into Model Space\n• This is where you SET UP FOR PRINTING\n\n**Think of it this way:**\n• Model Space = your architect's studio with the full-size design\n• Paper Space = the camera taking photos of the design at different scales for the printed document\n\n**Why separate spaces?**\nYour building is drawn at real size (maybe 30m wide). Your paper is A3 (420mm wide). You need to scale the view down. Viewports handle this automatically.",
              },
              {
                title: "Creating Viewports",
                content:
                  "**Steps to set up a layout:**\n1. Click a **Layout tab** at the bottom (Layout1 or Layout2)\n2. You'll see a white rectangle (your paper) with a default viewport\n3. Delete the default viewport\n4. Type `MV` + Enter (MVIEW — create viewport)\n5. Click two corners to define the viewport rectangle\n6. A window into Model Space appears\n\n**Setting the scale:**\n1. Double-click INSIDE the viewport (you're now in Model Space through the viewport)\n2. Type `Z` + Enter (ZOOM)\n3. Type `1/100xp` + Enter → sets 1:100 scale\n   - `1/50xp` → 1:50 scale\n   - `1/200xp` → 1:200 scale\n4. Use PAN (don't ZOOM!) to position your drawing\n5. Double-click OUTSIDE the viewport to return to Paper Space\n\n**Lock the viewport:**\nAfter setting scale and position:\n1. Select the viewport border\n2. In Properties panel, set **Display Locked** = Yes\n3. Now you can't accidentally change the scale!",
                tip: "The 'xp' in zoom stands for 'times paper'. So 1/100xp means 1 paper unit = 100 model units. Always lock viewports after setting the scale!",
              },
              {
                title: "Multiple Viewports on One Sheet",
                content:
                  "Professional drawing sheets often have multiple views:\n\n**Typical A1 drawing sheet layout:**\n• Large viewport: Floor plan at 1:100\n• Medium viewport: Key section at 1:50\n• Small viewport: Detail at 1:20 or 1:10\n• Title block in the corner\n\n**Steps:**\n1. Create first viewport (`MV`), set to 1:100, lock it\n2. Create second viewport, set to 1:50, lock it\n3. Create third viewport for the detail, set to 1:20, lock it\n4. Each viewport can show a different part of your model at a different scale\n\n**Controlling viewport layers:**\nYou can freeze layers per-viewport:\n• Select the viewport border\n• Open Layer Properties Manager\n• Use the **VP Freeze** column to hide layers in this viewport only\n\nThis means you can show furniture in the plan viewport but hide it in the section viewport.",
                tip: "Put viewport borders on a non-printing layer (e.g., 'VIEWPORT' with Plot = No). The viewport frame won't show on your printed sheet.",
              },
            ],
            quiz: [
              {
                question: "After setting a viewport to 1:100 scale, what should you do immediately?",
                options: [
                  "Print the drawing",
                  "Lock the viewport to prevent accidental scale changes",
                  "Add dimensions",
                  "Change the visual style",
                ],
                correctIndex: 1,
                explanation: "Locking the viewport prevents accidentally zooming inside it, which would change the precise scale. Set Display Locked = Yes in Properties.",
              },
            ],
            keyCommands: ["MVIEW", "ZOOM", "MSPACE", "PSPACE", "PLOT"],
            practiceTask: "Create an A3 layout with two viewports: a floor plan at 1:100 and a wall section at 1:50. Lock both viewports and position the views correctly.",
          },
        ],
      },
    ],
  },
  {
    id: "site-planning",
    title: "Site Planning & Surveys",
    subtitle: "Landscape & Context",
    description:
      "Master site plans, topographic representation, grading concepts, and landscape elements. Learn to present buildings in their site context.",
    icon: "Map",
    color: "#30D158",
    level: "Intermediate",
    duration: "10 hours",
    tags: ["Site Plans", "Landscape", "Context"],
    modules: [
      {
        id: "site-m1",
        title: "Site Plans in AutoCAD",
        description: "Create professional site plans showing buildings, roads, and landscape.",
        lessons: [
          {
            id: "site-1-1",
            title: "Drawing Site Plans",
            duration: "22 min",
            type: "theory",
            description: "Learn to create comprehensive site plans with property lines, setbacks, and context.",
            steps: [
              {
                title: "Site Plan Elements",
                content:
                  "A **site plan** shows the building in relation to its surroundings. It typically includes:\n\n**Required elements:**\n• **Property boundary** — the legal limits of the site\n• **Building footprint** — hatched or filled outline of the building\n• **Setback lines** — minimum distances from property lines\n• **Roads and paths** — access and circulation\n• **North arrow** — orientation (block or symbol)\n• **Scale bar** — visual scale reference\n\n**Common additions:**\n• Contour lines (topography)\n• Trees and landscaping\n• Parking areas\n• Neighboring buildings (light outline)\n• Utilities (water, sewer, electrical connections)\n• Dimensions to property boundaries\n\n**Typical scale:** 1:200 or 1:500\n\n**Layers for site plans:**\n• S-BOUNDARY — property lines (thick)\n• S-BUILDING — building footprint\n• S-SETBACK — setback lines (dashed)\n• S-ROAD — roads and paths\n• S-LANDSCAPE — trees, grass\n• S-CONTOUR — topographic contours",
              },
              {
                title: "Property Boundaries & Setbacks",
                content:
                  "**Drawing property boundaries:**\nUsually drawn from survey data with bearings and distances.\n\n1. Start with a known corner point\n2. Use polar coordinates: `@distance<angle`\n3. For survey bearings like N45°30'E:\n   - Convert to AutoCAD angle: 90° - 45.5° = 44.5°\n   - Type `@30000<44.5` for a 30m line at that bearing\n\n**Creating setback lines:**\nSetbacks are easy with OFFSET:\n1. Draw your property boundary as a closed polyline\n2. `O` + Enter (OFFSET)\n3. Type the setback distance (e.g., `5000` for 5m setback)\n4. Click the boundary, then click inside\n5. The setback line appears as a smaller boundary\n6. Change it to a dashed linetype on the S-SETBACK layer\n\n**Building placement:**\n1. Draw the building footprint inside the setback lines\n2. Apply HATCH (SOLID or a light pattern) to the footprint\n3. Dimension from the building to property boundaries",
                tip: "Draw the north arrow as a block so you can easily rotate it for different site orientations. Include it in your template.",
              },
              {
                title: "Landscape & Trees",
                content:
                  "**Drawing trees in plan view:**\n\n**Simple method:**\n1. Draw a CIRCLE for the canopy (radius = mature spread)\n2. Draw a small circle or point at center for the trunk\n3. Make it a BLOCK (name: TREE-DECIDUOUS-8M for an 8m spread tree)\n4. COPY or INSERT around the site\n\n**Better method — crosshatch tree:**\n1. Draw the canopy circle\n2. Draw random internal lines (radiating from center)\n3. HATCH with a grass or organic pattern\n4. BLOCK it all together\n\n**Grass and landscape areas:**\n1. Draw the area boundary as a closed polyline\n2. Apply HATCH with a grass-like pattern\n3. Use a light green color on the S-LANDSCAPE layer\n\n**Paving and hardscape:**\n1. Draw the paved area\n2. HATCH with AR-HBONE (herringbone pavers) or a concrete pattern\n\n**Site plan hatching summary:**\n• Building footprint: SOLID (dark)\n• Roads/parking: AR-CONC or SOLID (grey)\n• Paths: AR-HBONE or AR-SAND\n• Grass: GRASS or DOTS pattern\n• Water: MUDST or ANSI37",
                tip: "Use different hatch scales for different materials so they're distinguishable when printed. Test print a small area before hatching the entire site.",
              },
            ],
            keyCommands: ["OFFSET", "HATCH", "BLOCK", "INSERT", "CIRCLE"],
            practiceTask: "Create a site plan for a rectangular property (40m × 25m) with 5m setbacks, a building footprint, an access road, 6 trees, and a north arrow. Use appropriate hatching for different areas.",
          },
        ],
      },
    ],
  },
];

// ─── Command Reference ───

export interface CommandRef {
  command: string;
  shortcut: string;
  category: string;
  description: string;
  syntax: string;
  example: string;
  architectureUse: string;
}

export const commandReference: CommandRef[] = [
  { command: "LINE", shortcut: "L", category: "Draw", description: "Creates straight line segments", syntax: "L → click start → click end (or type coords) → Enter", example: "L → click → @6000,0 → @0,4000 → C", architectureUse: "Wall outlines, partition lines, section cut lines" },
  { command: "CIRCLE", shortcut: "C", category: "Draw", description: "Creates a circle by center and radius", syntax: "C → click center → type radius → Enter", example: "C → click → 300 (600mm diameter column)", architectureUse: "Round columns, door swing reference, circular windows" },
  { command: "ARC", shortcut: "A", category: "Draw", description: "Creates an arc using various methods", syntax: "A → click 3 points, or CE for center mode", example: "A → CE → click hinge → click door edge → A → 90", architectureUse: "Door swings, curved walls, arched openings" },
  { command: "PLINE", shortcut: "PL", category: "Draw", description: "Creates connected polyline segments", syntax: "PL → click points → C to close", example: "PL → W → 200 → 200 → draw room → C", architectureUse: "Wall outlines (use Width for thick walls), room boundaries" },
  { command: "RECTANGLE", shortcut: "REC", category: "Draw", description: "Creates a rectangular polyline", syntax: "REC → click corner → @width,height", example: "REC → click → @6000,4000", architectureUse: "Quick room outlines, furniture, columns, opening marks" },
  { command: "HATCH", shortcut: "H", category: "Draw", description: "Fills enclosed areas with patterns", syntax: "H → pick pattern → click inside boundary → Enter", example: "H → ANSI31 (for section cuts) → click area", architectureUse: "Section cuts, floor materials, landscaping, concrete fills" },
  { command: "MOVE", shortcut: "M", category: "Modify", description: "Moves objects to a new position", syntax: "M → select → Enter → base point → destination", example: "M → select wall → Enter → pick corner → @3000,0", architectureUse: "Reposition walls, furniture, annotations" },
  { command: "COPY", shortcut: "CO", category: "Modify", description: "Duplicates objects", syntax: "CO → select → Enter → base point → destination(s)", example: "CO → select window → Enter → pick → @2000,0", architectureUse: "Repeat windows, columns, furniture, parking spaces" },
  { command: "ROTATE", shortcut: "RO", category: "Modify", description: "Rotates objects around a point", syntax: "RO → select → Enter → center → angle", example: "RO → select furniture → Enter → pick center → 45", architectureUse: "Angled furniture, rotated building on site plan" },
  { command: "MIRROR", shortcut: "MI", category: "Modify", description: "Creates a mirrored copy", syntax: "MI → select → Enter → pick mirror line → Y/N delete source", example: "MI → select half plan → Enter → pick axis → N", architectureUse: "Symmetrical floor plans, paired elements" },
  { command: "OFFSET", shortcut: "O", category: "Modify", description: "Creates parallel copies at distance", syntax: "O → distance → select object → pick side", example: "O → 200 → click wall → click inside", architectureUse: "Wall thickness, setback lines, contour lines, road edges" },
  { command: "TRIM", shortcut: "TR", category: "Modify", description: "Trims objects at cutting edges", syntax: "TR → Enter (all edges) → click parts to remove", example: "TR → Enter → click wall segments to remove", architectureUse: "Clean wall intersections, create openings, clean up details" },
  { command: "EXTEND", shortcut: "EX", category: "Modify", description: "Extends objects to boundary", syntax: "EX → Enter (all boundaries) → click end to extend", example: "EX → Enter → click short wall end", architectureUse: "Extend partition walls to meet exterior walls" },
  { command: "FILLET", shortcut: "F", category: "Modify", description: "Rounds corners with an arc", syntax: "F → R → radius → select two lines", example: "F → R → 100 → click wall1 → click wall2", architectureUse: "Rounded wall corners, smooth path edges" },
  { command: "SCALE", shortcut: "SC", category: "Modify", description: "Enlarges or reduces objects", syntax: "SC → select → Enter → base point → factor", example: "SC → select block → Enter → pick → 2 (double size)", architectureUse: "Scale imported drawings, resize blocks, detail scaling" },
  { command: "ARRAY", shortcut: "AR", category: "Modify", description: "Creates rectangular or polar patterns", syntax: "AR → select → Enter → choose Rectangular/Polar/Path", example: "ARRAYRECT → select column → 4 rows × 6 cols → 6000 spacing", architectureUse: "Column grids, parking layouts, repeated facades, seating" },
  { command: "EXPLODE", shortcut: "X", category: "Modify", description: "Breaks compound objects apart", syntax: "X → select objects → Enter", example: "X → select block → Enter", architectureUse: "Break blocks into editable lines, explode rectangles" },
  { command: "DIMLINEAR", shortcut: "DLI", category: "Annotate", description: "Creates horizontal/vertical dimensions", syntax: "DLI → click point1 → click point2 → position", example: "DLI → click wall end → click other end → position above", architectureUse: "Room widths, wall lengths, overall building dimensions" },
  { command: "DIMALIGNED", shortcut: "DAL", category: "Annotate", description: "Creates dimensions along angled objects", syntax: "DAL → click point1 → click point2 → position", example: "DAL → click angled wall start → click end → position", architectureUse: "Angled walls, roof slopes, property lines" },
  { command: "MTEXT", shortcut: "MT", category: "Annotate", description: "Creates multiline text with formatting", syntax: "MT → click two corners for text box → type → close", example: "MT → draw box → type 'LIVING ROOM' → close editor", architectureUse: "Room labels, general notes, title block text, specifications" },
  { command: "LAYER", shortcut: "LA", category: "Format", description: "Opens Layer Properties Manager", syntax: "LA → Enter", example: "LA → New → name: A-WALL → color: white → LW: 0.50", architectureUse: "Create and manage layers for organized drawings" },
  { command: "ZOOM", shortcut: "Z", category: "View", description: "Changes view magnification", syntax: "Z → E (extents) / A (all) / W (window)", example: "Z → E (zoom to see everything)", architectureUse: "Navigate large drawings, zoom to details or full plan" },
  { command: "EXTRUDE", shortcut: "EXT", category: "3D", description: "Creates 3D solid from 2D shape", syntax: "EXT → select closed shape → Enter → height", example: "EXT → select room polyline → Enter → 2700", architectureUse: "Turn floor plans into 3D walls, create massing models" },
  { command: "UNDO", shortcut: "U", category: "General", description: "Reverses the last action", syntax: "U → Enter (or Ctrl+Z)", example: "U (undoes last command)", architectureUse: "Fix mistakes instantly — use it liberally!" },
];

export const achievements = [
  { id: "first-line", title: "First Line", description: "Complete your first lesson", icon: "Pencil", requirement: 1 },
  { id: "getting-started", title: "Getting Started", description: "Complete all lessons in Module 1", icon: "Target", requirement: 4 },
  { id: "quiz-ace", title: "Quiz Ace", description: "Score 100% on any quiz", icon: "Zap", requirement: 0 },
  { id: "five-lessons", title: "Dedicated Learner", description: "Complete 5 lessons", icon: "BookOpen", requirement: 5 },
  { id: "ten-lessons", title: "Knowledge Builder", description: "Complete 10 lessons", icon: "Layers", requirement: 10 },
  { id: "command-explorer", title: "Command Explorer", description: "Try 10 commands in Command Lab", icon: "Terminal", requirement: 10 },
  { id: "all-fundamentals", title: "Fundamentals Master", description: "Complete all Fundamentals lessons", icon: "Trophy", requirement: 0 },
  { id: "note-taker", title: "Note Taker", description: "Save notes on 3 lessons", icon: "FileText", requirement: 3 },
];

export const weeklyActivity = [
  { day: "Mon", hours: 0 },
  { day: "Tue", hours: 0 },
  { day: "Wed", hours: 0 },
  { day: "Thu", hours: 0 },
  { day: "Fri", hours: 0 },
  { day: "Sat", hours: 0 },
  { day: "Sun", hours: 0 },
];
