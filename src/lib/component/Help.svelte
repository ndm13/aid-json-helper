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
        background-color: rgba(0, 0, 0, 0.9);
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
            <h3>And how do I load my changes?</h3>
            <p>
                It's the same thing, except click the scary red Import button and upload the edited file! You can save
                your changes here by clicking the Save button in the header: this will download a JSON file that you can
                import. Note that importing story cards will OVERWRITE ALL YOUR EXISTING CARDS IN THE STORY, so be SURE
                you select the right scenario/adventure/file when importing!
            </p>
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
            <h3>What's this about filters?</h3>
            <p>
                Seeing all your cards at once might not be what you want, especially if you have dozens or even hundreds
                and want to find something specific. Filters stack on top of each other, meaning you can have multiple
                active at once and see where they overlap.
            </p>
            <ul>
                <li>
                    <strong>Search Filters:</strong> You can search for text (case-insensitive) within the card title,
                    entry (the part that gets sent to the AI), or triggers (the part the AI uses to add a card to the
                    context). Remember, the AI is case-insensitive too!
                </li>
                <li>
                    <strong>Card Type:</strong> You can choose to view cards that match specific types. If you want to
                    quickly deselect all of them, click Clear Types. The list is multiple-selection, which means you
                    can have more than one type active at once.
                </li>
                <li>
                    When you're done, you can click <strong>Clear Filters</strong> to reset to the defaults.
                </li>
            </ul>
            <p>
                You can also sort the cards in a few ways:
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
            <p>
                You can also show cards that match some common errors or oversights:
            </p>
            <ul>
                <li>
                    <strong>Empty triggers:</strong> This will show cards that trigger on whitespace, or on empty text.
                    The AI will generally ALWAYS load these cards. It will also match cards with no triggers: this will
                    have the opposite effect, where the AI will NEVER load these cards. Most of the time, this isn't
                    what you want.
                </li>
                <li>
                    <strong>No Character Creator description:</strong> <em>If you are using Character Creator,</em> then
                    it is good practice for every Character Creator card to have a description so players know what
                    their choice means from a story standpoint. It's not required, just nice. If you are NOT using
                    Character creator, you can ignore this. Note that it will also match cards with the default text of
                    <kbd>Notes go here.</kbd>.
                </li>
            </ul>
            <h3>Speaking of triggers, what's that Show Triggers button do?</h3>
            <p>
                It displays all the triggers for all the cards in a single chunk. If you have a big story, this can be
                a LOT of data, which is why it's hidden by default. But it does highlight in red any time you have more
                than one card mapped to a trigger. If something doesn't look right, you can click on the trigger to
                show the card that uses it (replacing the Trigger search with that trigger).
            </p>
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