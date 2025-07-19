const CoachPage = () => {
  return (
    <>
      <h1>Coach Page</h1>
      <p>This is the coach page. It will:</p>
      <ul className="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
        <li>Display the coach's biographical information</li>
        <li>Display the total number of games played</li>
        <li>Display the total number of wins</li>
        <li>Display the total number of losses</li>
        <li>Display the total number of ties</li>
        <li>
          Use timeline component from DaisyUI to display the coach's career with
          job changes and notable events
        </li>
      </ul>
    </>
  );
};

export default CoachPage;
