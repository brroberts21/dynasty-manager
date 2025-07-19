const StatsPage = () => {
  return (
    <div className="p-4">
      <h1>Stats Page</h1>
      <p>This is the stats page. It will:</p>
      <ul className="list-disc list-inside">
        <li>Display historical stats data for teams</li>
        <li>Might fragment historical data for individuals and recruiting</li>
      </ul>
      <br />
      <p>Here are some ideas for analytics:</p>
      <ul className="list-disc list-inside">
        <li>Historical stats for teams</li>
        <li>Historical stats for individuals</li>
        <li>Historical stats for recruiting</li>
      </ul>
      <br />
      <p>Here are some ideas for recruiting analytics:</p>
      <ul className="list-disc list-inside">
        <li>
          Contain the overall ranking, number of players per stars, and total
          players for all recruiting classes
        </li>
        <li>
          Compare historical recruiting classes by overall ranking, number of
          players per stars, and total players
        </li>
        <li>
          Comparative analysis on recruiting to display distribution of starting
          OVR of recruits given stars and gem/bust by position
        </li>
        <li>
          Comparative analysis to determine which positions have the best
          starting OVR and within positions which archetypes have the best
          starting OVR
        </li>
        <li>
          Comparative analysis on recruiting to display distribution of starting
          OVR of recruits given stars and national ranking by position
        </li>
        <li>
          Create predictive model that takes stars and position to predict
          starting OVR
        </li>
        <li>
          Show the effects of gem/bust on starting OVR and development trait
        </li>
        <li>
          Show the effects of development trait on starting OVR and development
          trait
        </li>
        <li>Document recruiting trends as coach level increases</li>
        <li>Document how coach traits affect recruiting</li>
        <li>
          Discover which states, regions, and pipelines produce the best
          recruits
        </li>
      </ul>
      <br />
      <p>Here are some ideas for player analytics:</p>
      <ul className="list-disc list-inside">
        <li>
          Track leading players by a plethora of stats, efficiency metrics, and
          anything possibly trackable
        </li>
        <li>Track the best historical players by position</li>
        <li>
          Track the best position groups per season. For example, track the best
          WR rooms across all teams to know who had Rydeouts.
        </li>
        <li>
          Have a compare player feature where you can compare player stats, dev
          data, archetype, etc.
        </li>
      </ul>
    </div>
  );
};

export default StatsPage;
