import {Choice, ChoiceGroup, Choices, O, Stats, Stat} from "./choices";


export let ALL_CHOICES = new Choices();

ALL_CHOICES.addChoice(new Choice("Succeed", "Will I succeed at it / my plan / etc?", 'award', [
    O('Yes, and then some', ['easy']),
    O('Yes', ['easy']),
    O('Yes, with complications', ['easy', 'hard']),
    O('Almost but not quite', ['easy', 'hard']),
    O('No', ['hard']),
    O('No and it gets even worse', ['hard']),
]));

ALL_CHOICES.addChoice(new Choice("Person", "What kind of person is it?", 'person', [
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

ALL_CHOICES.addChoice(new Choice("Disposition", "How are they disposed towards me?", 'activity', [
    O('Friendly', ['Mostly positive']),
    O('Open', ['Mostly positive']),
    O('Neutral', ['Mostly positive', 'Mostly negative']),
    O('Wary', ['Mostly positive', 'Mostly negative']),
    O('Suspicious', ['Mostly negative']),
    O('Angry', ['Mostly negative']),
]));

ALL_CHOICES.addChoice(new Choice("Character", "What is their character like?", 'file-earmark-person', [
    O('Extraverted'),
    O('Introverted'),
    O('Sensing'),
    O('Intuitive'),
    O('Thinking'),
    O('Feeling'),
    O('Judging'),
    O('Perceiving'),
]));

ALL_CHOICES.addChoice(new Choice("Sex", "What sex are they?", 'person-standing-dress', [
    O("Male"),
    O("Female"),
]));

ALL_CHOICES.addChoice(new Choice("Yes or No", "Simple Yes / No Question?", 'check', [
    O("Yes"),
    O("No"),
]));

ALL_CHOICES.addChoice(new Choice("How many", "How many of them are there?", '123', [
    O("None", ["up to a few"]),
    O("One", ["up to a few", "at least some"]),
    O("A few", ["up to a few", "at least some"]),
    O("More than a few", ["at least some"]),
    O("Lots", ["at least some"]),
]));

ALL_CHOICES.addChoice(new Choice("Complication", "What is the nature of the complication that happens?", 'gear', [
    O("A person", ["concrete"]),
    O("An animal", ["concrete"]),
    O("A thing", ["concrete"]),
    O("An opportunity", ["concept"]),
    O("An emotion", ["concept"]),
    O("An event", ["concept"]),
    O("A disaster", ["concept"]),
]));

ALL_CHOICES.addChoice(new Choice("Humor", "What kind of humor is it?", 'emoji-laughing', [
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

ALL_CHOICES.addChoice(new Choice("Quests", "What kind of quest is it?", 'journal-text', [
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


export let GROUPS = new ChoiceGroup();
GROUPS.groups['Person'] = [
    ALL_CHOICES.getChoiceNamed('Person'),
    ALL_CHOICES.getChoiceNamed('Disposition'),
    ALL_CHOICES.getChoiceNamed('Character'),
];

GROUPS.groups['Crowd'] = [
    ALL_CHOICES.getChoiceNamed('How many'),
    ALL_CHOICES.getChoiceNamed('Disposition'),
]

export let STATS = new Stats();
STATS.add(new Stat('Charisma', 0, 'emoji-smile'));
STATS.add(new Stat('Strength', 0, 'person-arms-up'));
STATS.add(new Stat('Intelligence', 0, 'cpu'));
STATS.add(new Stat('Constitution', 0, 'fork-knife'));

export let COMPOSITE_SUCCESS = new Choice(
    'Success', 'Does the action or plan succeed?', 'award', [
        O('Yes, overwhelmingly so'),
        O('Yes and a bit more besides'),
        O('Yes exactly as intended'),
        O('Yes but with a minor complication'),
        O('Almost but not quite'),
        O('No and a minor complication arises'),
        O('No and a significant complication occurs'),
        O('No, it is an unmitigated disaster'),
    ]
)