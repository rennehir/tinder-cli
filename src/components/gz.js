"use strict";
const React = require("react");
const { Box, Color, Text } = require("ink");

const gz =
	"@@@ @@@@@@@  @@  @@@@@@       @@@@@@       @@@@@@@@@@   @@@@@@  @@@@@@@  @@@@@@@ @@@  @@@ @@@\n@@!   @@!   !@  !@@          @@!  @@@      @@! @@! @@! @@!  @@@   @@!   !@@      @@!  @@@ @@@\n!!@   @!!        !@@!!       @!@!@!@!      @!! !!@ @!@ @!@!@!@!   @!!   !@!      @!@!@!@! !@!\n!!:   !!:           !:!      !!:  !!!      !!:     !!: !!:  !!!   !!:   :!!      !!:  !!!    \n:      :        ::.: :        :   : :       :      :    :   : :    :     :: :: :  :   : : :.:\n                                                                                             \n";

const Gz = () => {
	return (
		<Box flexDirection="column" marginX={1} marginY={3}>
			<Color red>
				<Text bold>{gz}</Text>
			</Color>
		</Box>
	);
};

module.exports = Gz;
