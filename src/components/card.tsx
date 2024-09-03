import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Card, Box, CardHeader, CardContent, Popover, Chip, Avatar, Typography, Divider} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import FinLottiePlaceholder from '../svg/FinLottiePlaceholder.svg';

interface SupportHelperCardProps {
	title: string;
	subtitle: string;
	chips: { label: string, icon?: React.ReactElement }[];
}

const SupportHelperCard: React.FC<SupportHelperCardProps> = ({ title, subtitle, chips }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [visibleChips, setVisibleChips] = useState<number>(0);
	const [criticalSmall, setCriticalSmall] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const mutatedChips = useMemo(() => {
		return chips.reverse().slice(0, chips.length - visibleChips)
	}, [visibleChips]);

	useEffect(() => {
		const calculateVisibleChips = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				setCriticalSmall(containerRef.current.offsetWidth < 400)
				let totalWidth = 0;
				let chipsCount = 0;

				for (let i = 0; i < chips.length; i++) {
					const chipWidth = 80;
					if (totalWidth + chipWidth > containerWidth) break;
					totalWidth += chipWidth -10;
					chipsCount++;
				}

				setVisibleChips(chipsCount);
			}
		};

		const resizeObserver = new ResizeObserver(() => calculateVisibleChips());

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		calculateVisibleChips();

		return () => {
			if (containerRef.current) {
				resizeObserver.unobserve(containerRef.current);
			}
		};
	}, [chips]);

	return (
		<Card sx={{
			mx: 3,
			width: '700px',
			background: '#212226',
		}}>
			<CardHeader
				sx={{
					color: '#fff'
				}}
				title={<Typography variant='body1'>{title}</Typography>}
				avatar={<Avatar variant="rounded" src={FinLottiePlaceholder} />}
				subheader={<Typography variant='body2' sx={{opacity: '0.3'}}>{subtitle}</Typography>}
				action={<MoreHorizIcon sx={{color: "#BFC1CA"}}/>}
			/>
			<CardContent >
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					style={{ overflowX: 'hidden', paddingTop: '8px' }}
				>
					<Box
						ref={containerRef}
						style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px', whiteSpace: 'nowrap', width: '100%', overflow:'hidden' }}
					>
						{chips.map((chip, index) => (
							<Chip key={index} label={!criticalSmall && chip.label} icon={chip.icon} sx={{
								color: '#fff'
							}}/>

						))}
					</Box>
					{!criticalSmall && visibleChips < chips.length && (
						<>
							<Chip label={`+${chips.length - visibleChips}`}
							      sx={{
									color: '#fff'
							      }}
							      onMouseEnter={handlePopoverOpen}
							      onMouseLeave={handlePopoverClose}
							/>
							<Popover
								sx={{ pointerEvents: 'none' }}
								open={open}
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								onClose={handlePopoverClose}
								disableRestoreFocus
							>
								<Box
									sx={{
									p:1,
									display:"flex",
									justifyContent: 'start',
									background: '#212226',
									flexDirection: 'column',
								}}>
									{mutatedChips.map((chip, index) => (
										<Chip key={index} label={chip.label} icon={chip.icon} sx={{
											color: '#fff'
										}}/>
									))}
								</Box>
							</Popover>
						</>
					)}
				</Box>
			</CardContent>
		</Card>
	);
};

export default SupportHelperCard;
