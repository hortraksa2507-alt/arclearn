import type { Lang } from "./translations";
import type { Course, CommandRef } from "./courses";

interface CourseTranslation { title: string; subtitle: string; description: string; tags: string[]; }
interface ModuleTranslation { title: string; description: string; }
interface LessonTranslation { title: string; description: string; steps?: { title: string; content: string; tip?: string }[]; quiz?: { question: string; options: string[]; explanation: string }[]; practiceTask?: string; }
interface AchievementTranslation { title: string; description: string; }
interface CommandTranslation { description: string; architectureUse: string; }

type TranslationData = {
  courses: Record<string, CourseTranslation>;
  modules: Record<string, ModuleTranslation>;
  lessons: Record<string, LessonTranslation>;
  achievements: Record<string, AchievementTranslation>;
  commands: Record<string, CommandTranslation>;
};

// ═══════════════════════════════════════════════════════════
// KHMER TRANSLATIONS
// ═══════════════════════════════════════════════════════════

const kmCourses: Record<string, CourseTranslation> = {
  fundamentals: {
    title: "មូលដ្ឋានគ្រឹះ AutoCAD",
    subtitle: "ស្វែងយល់ពីមូលដ្ឋាន",
    description: "បង្កើតមូលដ្ឋានគ្រឹះរឹងមាំក្នុង AutoCAD។ រៀនពីចំណុចប្រទាក់ ឧបករណ៍គូរសំខាន់ៗ ប្រព័ន្ធកូអរដោនេ និងពាក្យបញ្ជាកែសម្រួលមូលដ្ឋានដែលស្ថាបត្យករគ្រប់រូបត្រូវការ។",
    tags: ["ចំណុចប្រទាក់", "ការគូរ", "កូអរដោនេ"],
  },
  "architectural-drafting": {
    title: "ការគូរប្លង់ស្ថាបត្យកម្ម",
    subtitle: "គំនូរប្លង់ជំនាញ",
    description: "រៀនបង្កើតគំនូរប្លង់គុណភាពផលិតកម្ម។ ស្វែងយល់ពី Layer ការវាស់វែង Hatching និងកំណត់ចំណាំ។",
    tags: ["Layer", "ការវាស់វែង", "Hatching", "កំណត់ចំណាំ"],
  },
  "3d-modeling": {
    title: "ការធ្វើគំរូ 3D សម្រាប់ស្ថាបត្យករ",
    subtitle: "ធ្វើឱ្យការរចនាមានជីវិត",
    description: "ផ្លាស់ប្តូរពី 2D ទៅ 3D។ បង្កើតគំរូរឹង រុករកលំហ 3D និងបង្កើតការសិក្សាទម្រង់សម្រាប់ស្ថាបត្យកម្ម។",
    tags: ["3D Solids", "Extrude", "ការរុករក"],
  },
  "blocks-references": {
    title: "Blocks និង References",
    subtitle: "សមាសធាតុអាចប្រើឡើងវិញ",
    description: "បង្កើតសមាសធាតុគំនូរប្លង់អាចប្រើឡើងវិញ។ បង្កើតបណ្ណាល័យ Block សម្រាប់ទ្វារ បង្អួច និងគ្រឿងសង្ហារិម។",
    tags: ["Blocks", "Xrefs", "បណ្ណាល័យ"],
  },
  "plotting-output": {
    title: "ការបោះពុម្ព និងលទ្ធផល",
    subtitle: "គំនូរប្លង់ត្រៀមបោះពុម្ព",
    description: "ស្វែងយល់ពីការផលិតគំនូរបោះពុម្ពជំនាញ។ រៀនពី Layout Viewport និងការនាំចេញ PDF។",
    tags: ["ការបោះពុម្ព", "Layouts", "PDF"],
  },
  "site-planning": {
    title: "ការរៀបចំផែនការទីតាំង និងស្ទង់មតិ",
    subtitle: "ទេសភាព និងបរិបទ",
    description: "ស្វែងយល់ពីផែនការទីតាំង ព្រំដែនដី និងទេសភាព។ រៀនបង្ហាញអគារក្នុងបរិបទទីតាំងពិតប្រាកដ។",
    tags: ["ផែនការទីតាំង", "ទេសភាព", "ព្រំដែន"],
  },
};

const kmModules: Record<string, ModuleTranslation> = {
  "fund-m1": { title: "ការចាប់ផ្តើមជាមួយ AutoCAD", description: "រុករកកន្លែងធ្វើការ និងស្វែងយល់ពីរបៀបដែល AutoCAD ដំណើរការ។" },
  "fund-m2": { title: "ពាក្យបញ្ជាគូរសំខាន់ៗ", description: "រៀនពាក្យបញ្ជាស្នូលដែលបង្កើតបាន ៩០% នៃការគូរប្លង់ស្ថាបត្យកម្ម។" },
  "fund-m3": { title: "ការកែសម្រួល និងកែប្រែវត្ថុ", description: "រៀនផ្លាស់ទី ចម្លង បង្វិល កាត់ និងបំលែងគំនូរប្លង់របស់អ្នក។" },
  "arch-m1": { title: "ការគ្រប់គ្រង Layer", description: "រៀបចំគំនូរប្លង់ដូចអ្នកជំនាញជាមួយការដាក់ Layer។" },
  "arch-m2": { title: "ការវាស់វែង និងកំណត់ចំណាំ", description: "បន្ថែមការវាស់វែងច្បាស់លាស់ និងកំណត់ចំណាំជំនាញទៅគំនូរប្លង់។" },
  "arch-m3": { title: "Hatching និង Fill Patterns", description: "បន្ថែមការតំណាងសម្ភារៈ និងផ្នែកកាត់ដោយប្រើ hatching។" },
  "arch-m4": { title: "អក្សរ និង Leaders", description: "បន្ថorg org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org" },
  "3d-m1": { title: "ការណorg org org org org org org org org org org org 3D", description: "org org org org org org org org org org org org org org org org org org org org org org org org org org org org org 3D org org org org。" },
  "3d-m2": { title: "ប org org org org org org Boolean org ការorg org org org org Solid", description: "org org org org org org org org org org org org org org org org org org org org 3D Solids org org org org。" },
  "blk-m1": { title: "org org org org org org org org org org org org org org org Blocks", description: "org org org org org org org org org org org org org org org org org org org org org org org org。" },
  "plot-m1": { title: "Layouts org Viewports", description: "org org org org org org org org org org org org org org org org org org org org org org org。" },
  "site-m1": { title: "org org org org org org org org org org org org org org org AutoCAD", description: "org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org。" },
};

const kmAchievements: Record<string, AchievementTranslation> = {
  "first-line": { title: "ខ្សorg org org org org org org org org org org org org org org org org org org org org", description: "org org org org org org org org org org org org org org org org org org org org org org org org org org" },
  "getting-started": { title: "org org org org org org org org org org org org org", description: "org org org org org org org org org org org org org org org Module 1" },
  "quiz-ace": { title: "org org org org org org org org org org org org", description: "org org org org org org org org org org org org org org 100% org org org org org org org org org org" },
  "five-lessons": { title: "org org org org org org org org org org org org org", description: "org org org org org org org org org org org org org org org 5 org org org org org org" },
  "ten-lessons": { title: "org org org org org org org org org org org org org org org org org org org", description: "org org org org org org org org org org org org org org org 10 org org org org org org" },
  "command-explorer": { title: "org org org org org org org org org org org org org org org org org org org org org org", description: "org org org org org org org org 10 org org org org org org org org org org Command Lab" },
  "all-fundamentals": { title: "org org org org org org org org org org org org org org org org org org org org org org", description: "org org org org org org org org org org org org org org org org org org org org org org org org org org org Fundamentals" },
  "note-taker": { title: "org org org org org org org org org org org org org org org org", description: "org org org org org org org org org org org org org org org org org org org org org 3 org org org org org org org" },
};

const kmCommands: Record<string, CommandTranslation> = {
  LINE: { description: "បង org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org", architectureUse: "org org org org org org org org org org org org org org org org org org org org org org org org org org org" },
  CIRCLE: { description: "org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org", architectureUse: "org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org" },
};

const kmLessons: Record<string, LessonTranslation> = {
  "fund-1-1": {
    title: "ចorg org org org org org org org org org org AutoCAD",
    description: "org org org org org org org org org org org org org org org org org org org AutoCAD org org org org org org org org org org org org org org org org org org org。",
  },
  "fund-1-2": {
    title: "ការorg org org org org org org org org org org org org org org org org org",
    description: "org org org org org org org units, limits org workspace org org org org org org org org org org org org org org org org org org org org org org org。",
  },
  "fund-1-3": {
    title: "org org org org org org org org org org org org org org org",
    description: "org org org org org org org org org org org org org ៣ org org org org org org AutoCAD org org org org org org org org org org org org org org org org org org org。",
  },
  "fund-1-4": {
    title: "org org org org org org org org org org org org org org org org org org org org org org",
    description: "org org org org org org org org org org org org LINE, org org org org org org org org org org, org OSNAP org org org org org org org org org org org org org。",
  },
  "fund-2-1": {
    title: "org org org org org org, org org org org, org Arcs",
    description: "org org org org org org org org org org org org org org org org org org org org ៣ org org org org org org org org。",
  },
  "fund-2-2": {
    title: "Polylines org org org org org org org org org org org org org",
    description: "org org org POLYLINE org RECTANGLE org org org org org org org org org org org org org org org org org org org org org org。",
  },
  "fund-2-3": {
    title: "org org org org org org org org org org org org org org org",
    description: "org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org。",
  },
  "fund-3-1": {
    title: "ការorg org org org org org org org org org, ចorg org org org org org org org org org org org org org",
    description: "org org org org org org org Move, Copy org Rotate org org org org org org org org org org org org org org。",
  },
  "fund-3-2": {
    title: "ការorg org org org org org org, ការorg org org org org org org, org Offset",
    description: "org org org org org org Trim, Extend org Offset org org org org org org org org org org org org org org org org org。",
  },
  "arch-1-1": { title: "ការorg org org org org org Layers", description: "org org org org org org org org org org org layer org org org org org org org org org org org org org org org org org org org org org org org org org org org org org。" },
  "arch-2-1": { title: "org org org org org org org org org org org org org org org org org org org org", description: "org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org。" },
  "arch-3-1": { title: "org org org org org org org org org Hatching", description: "org org org org org org org org org org org org org org hatch org org org org org org org org org org org org org org org org org org org org org org org。" },
  "arch-4-1": { title: "org org org org org org org org org org org org org org org org org org org org org org", description: "org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org org。" },
  "3d-1-1": { title: "org org org org org org 3D org ViewCube", description: "org org org org org org org org 3D org org org org org org org org org org org org org org org org org org org org org org org org org org org org。" },
  "3d-2-1": { title: "Union, Subtract org Intersect", description: "org org org org org org org org org org org org org org org org org boolean org org org org org org org org org org org org org org org org org org。" },
};

export const courseTranslations: Record<Lang, TranslationData> = {
  en: { courses: {}, modules: {}, lessons: {}, achievements: {}, commands: {} },
  km: {
    courses: kmCourses,
    modules: kmModules,
    lessons: kmLessons,
    achievements: kmAchievements,
    commands: kmCommands,
  },
};

export function getTranslatedCourse(courseId: string, lang: Lang, originalCourse: Course): Course {
  if (lang === "en") return originalCourse;
  const t = courseTranslations[lang];
  if (!t) return originalCourse;
  const ct = t.courses[courseId];
  const translatedModules = originalCourse.modules.map((mod) => {
    const mt = t.modules[mod.id];
    const translatedLessons = mod.lessons.map((lesson) => {
      const lt = t.lessons[lesson.id];
      if (!lt) return lesson;
      return {
        ...lesson,
        title: lt.title || lesson.title,
        description: lt.description || lesson.description,
        steps: lt.steps
          ? lt.steps.map((s, i) => ({
              ...lesson.steps[i],
              title: s.title || lesson.steps[i]?.title,
              content: s.content || lesson.steps[i]?.content,
              ...(s.tip !== undefined ? { tip: s.tip } : {}),
            }))
          : lesson.steps,
        ...(lt.quiz ? { quiz: lt.quiz.map((q, i) => ({ ...lesson.quiz![i], question: q.question, options: q.options, explanation: q.explanation })) } : {}),
        ...(lt.practiceTask !== undefined ? { practiceTask: lt.practiceTask } : {}),
      };
    });
    return { ...mod, ...(mt ? { title: mt.title, description: mt.description } : {}), lessons: translatedLessons };
  });
  return { ...originalCourse, ...(ct ? { title: ct.title, subtitle: ct.subtitle, description: ct.description, tags: ct.tags } : {}), modules: translatedModules };
}

export function getTranslatedAchievement(id: string, lang: Lang, original: { title: string; description: string }): { title: string; description: string } {
  if (lang === "en") return original;
  const t = courseTranslations[lang]?.achievements[id];
  return t ?? original;
}

export function getTranslatedCommand(command: string, lang: Lang, original: CommandRef): CommandRef {
  if (lang === "en") return original;
  const t = courseTranslations[lang]?.commands[command];
  return t ? { ...original, description: t.description, architectureUse: t.architectureUse } : original;
}
