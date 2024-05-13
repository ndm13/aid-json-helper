<script lang="ts">
    import StoryCard from "./StoryCard.svelte";
    import type {StoryCard as StoryCardType} from "../model/StoryCard";

    let help = false;

    const demoCard: StoryCardType = {
        title: "Title of Your Card",
        value: "This is the part that gets sent to the AI.",
        useForCharacterCreation: true,
        keys: "words,that,trigger,the ai,and can include, leading,and trailing ,spaces",
        description: "This is the part that gets shown to the user in Character Creator, or a space for notes.",
        type: "Card Type"
    };
</script>
<style>
    section {
        position: fixed;
        box-sizing: border-box;
        overflow: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(1ex);
        z-index: 999;
    }

    article {
        width: 50em;
        max-width: 100%;
        margin: 3em auto;
    }

    p, ul {
        text-align: left;
    }

    a {
        color: #f8ae2c;
        text-decoration: none;
    }
</style>
<button on:click={() => help = true}>What is all of this?</button>
{#if help}
    <section>
        <article>
            <h2>What is all of this?</h2>
            <button on:click={() => help = false}>Oh no, text! Take me back!</button>
            <p>
                This is a tool for use with <a target="_blank" href="https://play.aidungeon.com/">AI Dungeon's</a> Story
                Cards. Story cards are chunks of text that provide additional details to the AI when one of the trigger
                words listed is mentioned. These trigger words are not case sensitive, but do take things like spaces
                into account. Since the native tools can become a bit tedious for large batches of story cards, and
                since AI Dungeon lets you export them and import them again, this tool tries to offer as many missing
                features as possible.
            </p>
            <h3>How do I get the cards?</h3>
            <p>
                In the [...] menu of your scenario or adventure, there should be an Edit option. There should also be an
                Edit button on the scenario or adventure's page. Clicking that will open a nice pop-up that gives you
                access to the behind-the-scenes stuff. On the Details tab, scroll down to the bottom and you should see
                a section labeled Story Card Management (if you're on mobile, it may ask you to use your browser for
                this: go ahead and switch). Click the gray Export button to get your cards!
            </p>
            <p>
                Alternatively, you can build everything right here! There's an Add Card button next to the file upload
                button in the header area. Clicking that will create a blank card and add it to the working set.
            </p>
            <h3>And how do I load my changes?</h3>
            <p>
                It's the same thing, except click the scary red Import button and upload the edited file! You can save
                your changes here by clicking the Save button in the header: this will download a JSON file that you can
                import. Note that importing story cards will OVERWRITE ALL YOUR EXISTING CARDS IN THE STORY, so be SURE
                you select the right scenario/adventure/file when importing!
            </p>
            <h3>That's the AI Dungeon side. What about here?</h3>
            <p>
                There's a nice row of buttons along the top:
            </p>
            <ul>
                <li>
                    <strong>New Card</strong> creates a card directly, allowing you to edit its placeholder data right
                    here in the tool. This will let you create sets from scratch or add cards to existing sets.
                </li>
                <li>
                    The <strong>From File</strong> menu lets you import cards that you've stored locally:
                    <ul>
                        <li>
                            <strong>Import JSON</strong> adds an exported JSON file to the current set of cards.
                        </li>
                        <li>
                            <strong>Import Markdown...</strong> lets you load
                            <a href="https://obsidian.md" target="_blank">Obsidian</a> Markdown files (and other files
                            that follow that convention) as story cards by using the file name as the card title and its
                            contents as the entry/description. This is still experimental and may not work 100% as
                            expected. You'll get a dialog that lets you set some defaults.
                        </li>
                        <li>
                            <strong>Open File</strong> <em>replaces</em> the current set of cards with the contents of
                            an exported JSON file. You'll get a nice warning to confirm that this is what you want to
                            do.
                        </li>
                    </ul>
                </li>
                <li>
                    The <strong>Save</strong> menu lets you export cards that are currently loaded:
                    <ul>
                        <li>
                            <strong>Save All Cards</strong> writes all the cards in the current session to a JSON file
                            that is compatible with AI Dungeon (and this tool, obviously).
                        </li>
                        <li>
                            <strong>Save Filtered Cards</strong> does the same thing, but only for the cards that are
                            being shown by the active filter.
                        </li>
                    </ul>
                    Note that attempting to save any cards that would normally fail to import into AI Dungeon will show
                    an error. You can choose to ignore this, but you WILL lose some cards on import if you continue!
                </li>
                <li>
                    <strong>Clear Cards</strong> removes every card in the current session. Don't worry, this one comes
                    with a nice warning too. Refreshing the page will do the same thing, but without warning you!
                </li>
            </ul>
            <h3>That's good and all, but how do I edit a story card?</h3>
            <p>
                Each card pops up with a little editor window. Any changes you make here will instantly update the JSON,
                and when you're satisfied with your changes you can save the file as described above.
            </p>
            <p>
                Here's a sample you can play with. Editing this won't affect anything you have loaded.
            </p>
            <StoryCard card={demoCard}/>
            <p>
                Some points to note:
            </p>
            <ul>
                <li>
                    The ⋯ icon toggles a drawer of card actions.
                    <ul>
                        <li>
                            <strong>Delete</strong> lets you delete a story card. It pops up a nice big warning message
                            asking if you're sure, just to be safe. Clicking yes on the sample card won't have any
                            effect, but on real cards it will remove it from the set.
                        </li>
                        <li>
                            <strong>Copy JSON</strong> puts the current card's JSON on your clipboard. Useful if you're
                            moving it to other programs or sharing the data.
                        </li>
                        <li>
                            <strong>Copy Markdown</strong> puts the current card's title, entry text, and trigger list
                            on your clipboard as Markdown formatted text (the same format Discord and Obsidian use).
                            Useful if you're sharing it with members of the community or moving it to Markdown-based
                            tools.
                        </li>
                    </ul>
                </li>
                <li>
                    The ✨ icon button shows whether the card is visible in Character Creation. It's highlighted orange
                    if so, and shows the normal color if not. If you don't use Character Creation, you can ignore this:
                    cards will always have this enabled by default, and it doesn't affect gameplay.
                </li>
                <li>
                    The default card types are <kbd>location</kbd>, <kbd>faction</kbd>, <kbd>class</kbd>, and
                    <kbd>race</kbd>
                    . All other card types will show up under Custom in AI Dungeon. Note that the filter
                    on here is case sensitive, so if you have <kbd>Spell</kbd> and <kbd>spell</kbd>, it will show twice
                    in the list.
                </li>
                <li>
                    The triggers are split apart by default, preserving whitespace. When you click the edit button, it
                    will convert to the standard AI Dungeon format of a comma-separated list.
                </li>
                <li>
                    The button in the top-right corner puts you into a full-screen editor. Clicking it again toggles it
                    back to normal.
                </li>
                <li>
                    Most of the time, the description for a story card is meaningless. It is displayed for users if the
                    card is being used in a character creator scenario, but otherwise it's mostly used for notes. New
                    scenarios default this value to the same thing you enter in the main area. The editor hides it by
                    default, but you can click the Show Description (and subsequent Hide Description) button to toggle
                    it for the card.
                </li>
            </ul>
            <h3>There are a bunch of tabs, what do those do?</h3>
            <p>
                This is a central point for manipulating the list of cards. Everything in here filters the list of cards
                that you see.
            </p>
            <h4>Filter</h4>
            <p>
                This tab has the most common ways to narrow down your cards: searching within card titles, entries, and
                triggers, as well as selecting from specific types.
            </p>
            <ul>
                <li>
                    <strong>Search Filters:</strong> You can search for text (case-insensitive) within the card title,
                    entry (the part that gets sent to the AI), or triggers (the part the AI uses to add a card to the
                    context). Remember, the AI is case-insensitive too!
                </li>
                <li>
                    <strong>Card Type:</strong> You can choose to view cards that match specific types. If you want to
                    quickly deselect all of them, click Clear Types (and go back to all with Select All Types). The list
                    is multiple-selection, which means you can have more than one type active at once.
                </li>
                <li>
                    When you're done, you can click <strong>Clear Filters</strong> to reset to the defaults.
                </li>
            </ul>
            <h4>Sort</h4>
            <p>
                This tab lets you change the order in which the cards are displayed.
            </p>
            <ul>
                <li>
                    <strong>Alphabetically:</strong> Sort by card title in alphabetical order.
                </li>
                <li>
                    <strong>By type:</strong> Sort by card type in alphabetical order.
                </li>
                <li>
                    <strong>By entry length:</strong> Sort by the length of the entry text. Useful for finding overly
                    short or long cards.
                </li>
            </ul>
            <p>
                To change the sort direction, click the Sort Ascending (or Sort Descending) button.
            </p>
            <h4>Fix Common Errors</h4>
            <p>
                This tab lets you see any cards that match some common errors and oversights.
            </p>
            <ul>
                <li>
                    <strong>Missing triggers:</strong> This will show cards with no triggers. The AI will NEVER load
                    these cards if present, and will fail to import these cards when you try.
                </li>
                <li>
                    <strong>No entry text:</strong> This will show cards that are missing an entry. Besides being
                    useless, they will also fail to import if you try.
                </li>
                <li>
                    <strong>Duplicate dropped on import:</strong> This will show cards that match in both trigger list
                    and card type. Because of how AI Dungeon checks for duplicate cards, if any cards match this filter,
                    all but one will fail to import! If you need duplicate triggers on the same card type, try changing
                    the order of the trigger list: AI Dungeon only cares if the <em>list</em> of keys is identical, not
                    if all the items in the list is the same.
                </li>
                <li>
                    <strong>Empty triggers:</strong> This will show cards that trigger on whitespace, or on empty text.
                    The AI will generally ALWAYS load these cards. Most of the time, this isn't what you want.
                </li>
                <li>
                    <strong>No Character Creator description:</strong> <em>If you are using Character Creator,</em> then
                    it is good practice for every Character Creator card to have a description so players know what
                    their choice means from a story standpoint. It's not required, just nice. If you are NOT using
                    Character creator, you can ignore this. Note that it will also match cards with the default text of
                    <kbd>Notes go here.</kbd>.
                </li>
            </ul>
            <p>
                There are also some quick actions available to fix common issues:
            </p>
            <ul>
                <li>
                    <strong>Remove All Empty Triggers</strong> does what it says on the tin, and shows you a list of all
                    cards with empty (blank or whitespace) triggers and offers to remove those triggers from those cards
                    for you. All other triggers will remain in place.
                </li>
                <li>
                    <strong>Apply Official Cleanup Fix</strong> is a more nuanced subset of Remove All Empty Triggers,
                    taking the same approach Latitude is implementing when saving a story card and only removing the
                    <em>last</em> trigger if it's empty (blank or whitespace). If there are cards flagged for this fix,
                    you have two options: if it's a mistake, run the cleanup fix. If it's intentional, move the empty
                    trigger to the beginning or middle of the trigger list: <em>otherwise it may be removed when editing
                    your card in AI Dungeon!</em>
                </li>
            </ul>
            <h4>Triggers</h4>
            <p>
                This tab lists all the triggers for all of the loaded cards. Clicking on a trigger will place it in the
                trigger filter box on the Filter tab, showing you only cards that match that trigger. It also highlights
                some possible oversights.
            </p>
            <ul>
                <li>
                    Triggers highlighted in <strong>red</strong> are duplicates. This means that more than one card uses
                    this trigger. There are times when this is what you want, but usually it's wrong. They include an
                    x<em>n</em> indicator telling you how many cards are affected.
                </li>
                <li>
                    Triggers highlighted in <strong>orange</strong> are overlapping. This means that another trigger in
                    the list contains this trigger, effectively making it a one-way duplicate (e.g. the trigger "elf"
                    will also trigger "half-elf"). This may be necessary, or even desired, but often means you should
                    rethink your trigger design. They include a +<em>n</em> indicator telling you how many cards are
                    affected.
                </li>
            </ul>
            <h3>Something's broken/I have a cool idea/I just wanna say thanks</h3>
            <p>
                Hop in the <a target="_blank" href="https://discord.com/invite/HB2YBZYjyf">AI Dungeon Discord server</a>
                and check out the
                <a target="_blank" href="https://discord.com/channels/903327676884979802/1214767285655576696">thread
                under the sharing section</a> to give any feedback! You can also
                <a target="_blank" href="https://github.com/ndm13/aid-json-helper/issues">open an issue</a> on the
                project's <a target="_blank" href="https://github.com/ndm13/aid-json-helper/">GitHub page</a>, but
                there's no guarantee I'll get to it in a timely manner. This is a very casual project for me, but when
                the community is engaged it motivates me to work on it.
            </p>
            <p>
                The more technical questions (how it's built/deployed/developed) are probably answered on that GitHub
                page too.
            </p>
            <button on:click={() => help = false}>Okay, got it!</button>
        </article>
    </section>
{/if}