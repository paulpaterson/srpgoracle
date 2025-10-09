import {Choice, Choices, O} from "./choices";


export let ALL_CHOICES = new Choices();

ALL_CHOICES.addChoice(new Choice(
    "Succeed", [
        O('Yes, and then some', ['easy']),
        O('Yes', ['easy']),
        O('Yes, with complications', ['easy', 'hard']),
        O('Almost but not quite', ['easy', 'hard']),
        O('No', ['hard']),
        O('No and it gets even worse', ['hard']),
]));

ALL_CHOICES.addChoice(new Choice(
    "Person", [
        O('Younger man', ['man']),
        O('Younger woman', ['woman']),
        O('Man', ['man']),
        O('Woman', ['woman']),
        O('Older man', ['man']),
        O('Older woman', ['woman']),
        O('Teenager male', ['young']),
        O('Teenager female', ['young']),
        O('Child male', ['young']),
        O('Child female', ['young']),
]));

ALL_CHOICES.addChoice(new Choice(
    "Disposition", [
        O('Friendly', ['Mostly positive']),
        O('Open', ['Mostly positive']),
        O('Neutral', ['Mostly positive', 'Mostly negative']),
        O('Wary', ['Mostly positive', 'Mostly negative']),
        O('Suspicious', ['Mostly negative']),
        O('Angry', ['Mostly negative']),
]));

ALL_CHOICES.addChoice(new Choice(
    "Character", [
        O('Extraverted'),
        O('Introverted'),
        O('Sensing'),
        O('Intuitive'),
        O('Thinking'),
        O('Feeling'),
        O('Judging'),
        O('Perceiving'),
]));

ALL_CHOICES.addChoice(new Choice(
    "Sex", [
        O("Male"),
        O("Female"),
]));

ALL_CHOICES.addChoice(new Choice(
    "True or not", [
        O("Yes"),
        O("No"),
]));

ALL_CHOICES.addChoice(new Choice(
    "How many", [
        O("None", ["up to a few"]),
        O("One", ["up to a few", "at least some"]),
        O("A few", ["up to a few", "at least some"]),
        O("More than a few", ["at least some"]),
        O("Lots", ["at least some"]),
]));

ALL_CHOICES.addChoice(new Choice(
    "Complication", [
        O("A Person", ["concrete"]),
        O("A thing", ["concrete"]),
        O("An opportunity", ["concept"]),
        O("An emotion", ["concept"]),
        O("An event", ["concept"]),
        O("A disaster", ["concept"]),
]));

ALL_CHOICES.addChoice(new Choice(
    "Humor", [
        O("Physical", []),
        O("Slapstick", []),
        O("Edge/Offensive", []),
        O("Gallows or Dark", []),
        O("Deadpan or Dry", []),
        O("Satirical/Parody/Spoof", []),
        O("Wordplay", []),
        O("Witty or Highbrow", []),
        O("Ironic", []),
        O("Bodily/Earthy/Lowbrow", []),
]));

ALL_CHOICES.addChoice(new Choice(
    "Quests", [
        O("Heist or infiltration", []),
        O("Break a siege", []),
        O("Scout or spy mission", ['non-fantasy']),
        O("Monster hunt or drive dangers out", []),
        O("Investigate danger, crime", ['non-fantasy']),
        O("Discover or find a lost item", ['non-fantasy']),
        O("Fetch quest", ['non-fantasy']),
        O("Escort or delivery mission", ['non-fantasy']),
        O("Obtain a treasure that is guarded", ['non-fantasy']),
        O("Lift a curse or deal with cursed item", []),
        O("Disaster, plague, strange weather etc", []),
        O("Deal with injustice or fight polical corruption", ['non-fantasy']),
        O("Enchanted journey", []),
]));
